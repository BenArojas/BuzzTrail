import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Mountain,
  Calendar,
  Trophy,
  TrendingUp,
  MapPin,
  Users,
  Sun,
  Cloud,
  Wind,
} from "lucide-react";
import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUser } from "~/auth/auth";
import {
  getCompletedAdventures,
  getNextAdventures,
  getPreviousAdventures,
} from "~/db/adventure.server";
import { Link, useLoaderData } from "@remix-run/react";
import { weatherService } from "~/api/weatherService";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  invariant(user, "User is not logged in");
  const upcomingAdventures = await getNextAdventures(user.id);
  const previousAdventures = await getPreviousAdventures(user.id);
  const completedAdventures = await getCompletedAdventures(user.id);
  const today = new Date();
  let daysUntilNextAdventure = -1;
  if (upcomingAdventures.length > 0) {
    const differenceInMs =
      upcomingAdventures[0].startDate.getTime() - today.getTime();
    daysUntilNextAdventure = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  }
  const totalHikes = previousAdventures.length + upcomingAdventures.length;

  const location = {
    country: upcomingAdventures?.[0]?.country ?? "israel",
    state: upcomingAdventures?.[0]?.state ?? "jerusalem",
  };
  const weatherResult = await weatherService.getWeatherByLocation(location);
  const weather = weatherResult.getBestMatch();

  return {
    upcomingAdventures,
    previousAdventures,
    completedAdventures,
    daysUntilNextAdventure,
    totalHikes,
    location,
    weather,
  };
}

export default function HomePage() {
  const totalDistance = 567;

  const {
    completedAdventures,
    daysUntilNextAdventure,
    previousAdventures,
    totalHikes,
    upcomingAdventures,
    location,
    weather,
  } = useLoaderData<typeof loader>();
  const progressPercentage =
    totalHikes === 0 ? 0 : (completedAdventures.length / totalHikes) * 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, Hiker!</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Progress Tracker */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly Goal</CardTitle>
            <Mountain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progressPercentage.toFixed(2)}%
            </div>
            <Progress value={progressPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              completed {completedAdventures.length} adventures out of{" "}
              {totalHikes} so far!
            </p>
          </CardContent>
        </Card>

        {/* Countdown to Next Adventure */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Next Adventure
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {daysUntilNextAdventure != -1 ? (
              <>
                <div className="text-2xl font-bold">
                  {daysUntilNextAdventure} days
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Until your next hiking trip
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold">no next adventure</p>
            )}
          </CardContent>
        </Card>

        {/* Adventure Stats */}
        <Card className="col-span-full md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Adventure Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Hikes</span>
              </div>
              <span className="text-2xl font-bold">{totalHikes}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Distance</span>
              </div>
              <span className="text-2xl font-bold">{totalDistance} km</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Hikes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Hikes</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[calc(3*theme(spacing.16))] overflow-y-auto">
          <div className="space-y-4">
            {previousAdventures.length > 0 ? (
              previousAdventures.map((adventure) => (
                <div
                  key={adventure.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{adventure.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {adventure.startDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{adventure.difficulty}</Badge>
                    <span className="text-sm">{500} km</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No previous Adventures</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[calc(3*theme(spacing.16))] overflow-y-auto">
          <div className="space-y-4">
            {upcomingAdventures.length > 0 ? (
              upcomingAdventures.map((adventure) => (
                <div
                  key={adventure.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{adventure.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {adventure.startDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {adventure.participants} participants
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming Adventures</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>
            Weather in {weather.name}, {weather.sys.country}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div>
                <h3 className="font-semibold">Today</h3>
                <p className="text-sm text-muted-foreground">
                  {weather.main.temp}°C
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
            <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="h-12 w-12"
              />
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-sm text-muted-foreground">
                {weather.weather[0].description}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-x-2">
              <div className="flex flex-row items-center space-x-2">
                <h3 className="font-semibold">Feels like: </h3>
                <p className="text-sm ">{weather.main.feels_like}°C</p>
              </div>
                {weather.rain && <p>Rain: {weather.rain["1h"]} mm</p>}
            </div>
          </div>
          <Link
            target="_blank"
            to={`https://www.google.com/search?q=weather+${location.country}+${location.state}`}
          >
            <Button variant="outline" className="w-full mt-4">
              View Full Forecast
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
