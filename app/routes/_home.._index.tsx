import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Separator } from "~/components/ui/separator"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Mountain, Calendar, Trophy, TrendingUp, MapPin, Users, Sun, Cloud, Wind } from 'lucide-react'

export default function HomePage() {
  // Mock data - replace with actual data from your app
  const progressValue = 75
  const nextAdventure = new Date("2024-06-15")
  const totalHikes = 42
  const totalDistance = 567
  const elevationGain = 15280

  const daysUntilNextAdventure = Math.ceil((nextAdventure.getTime() - new Date().getTime()) / (1000 * 3600 * 24))

  const recentHikes = [
    { id: 1, name: "Mount Rainier Loop", date: "2024-05-01", distance: 15, difficulty: "Moderate" },
    { id: 2, name: "Cascade Falls Trail", date: "2024-04-15", distance: 8, difficulty: "Easy" },
    { id: 3, name: "Olympic National Park Trek", date: "2024-03-28", distance: 22, difficulty: "Hard" },
  ]

  const upcomingEvents = [
    { id: 1, name: "Group Hike: Sunset Peak", date: "2024-06-20", participants: 12 },
    { id: 2, name: "Trail Maintenance Volunteer Day", date: "2024-07-05", participants: 25 },
    { id: 3, name: "Night Sky Photography Hike", date: "2024-07-15", participants: 8 },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, Hiker!</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Progress Tracker */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Yearly Goal Progress
            </CardTitle>
            <Mountain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressValue}%</div>
            <Progress value={progressValue} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {100 - progressValue}% remaining to reach your goal
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
            <div className="text-2xl font-bold">{daysUntilNextAdventure} days</div>
            <p className="text-xs text-muted-foreground mt-2">
              Until your next hiking trip
            </p>
          </CardContent>
        </Card>

        {/* Adventure Stats */}
        <Card className="col-span-full md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Adventure Stats</CardTitle>
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
        <CardContent>
          <div className="space-y-4">
            {recentHikes.map((hike) => (
              <div key={hike.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{hike.name}</h3>
                  <p className="text-sm text-muted-foreground">{hike.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{hike.difficulty}</Badge>
                  <span className="text-sm">{hike.distance} km</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.participants} participants</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Today</h3>
                <p className="text-sm text-muted-foreground">Sunny, 22°C</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-gray-400" />
              <div>
                <h3 className="font-semibold">Tomorrow</h3>
                <p className="text-sm text-muted-foreground">Partly Cloudy, 20°C</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="font-semibold">Day After</h3>
                <p className="text-sm text-muted-foreground">Windy, 18°C</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">View Full Forecast</Button>
        </CardContent>
      </Card>
    </div>
  )
}

