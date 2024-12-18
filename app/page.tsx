import { MapPin, Calendar, DollarSign, CheckSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-500 to-yellow-600">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Adventure Dashboard</h1>
          <div className="bg-black/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-black font-semibold">Next Hike: Mount Everest Base Camp</p>
          </div>
        </div>

        {/* Top Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/80 border-yellow-500/50 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-yellow-500 font-bold">Time Left</CardTitle>
              <Calendar className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">15</div>
              <p className="text-xs text-yellow-500/80">Days until departure</p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-yellow-500/50 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-yellow-500 font-bold">Budget</CardTitle>
              <DollarSign className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$2,450</div>
              <p className="text-xs text-yellow-500/80">Remaining budget</p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-yellow-500/50 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-yellow-500 font-bold">Checklist</CardTitle>
              <CheckSquare className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8/12</div>
              <p className="text-xs text-yellow-500/80">Items packed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="bg-black/80 border-yellow-500/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-yellow-500 font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Route Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-black/50 flex items-center justify-center">
              <p className="text-yellow-500">Interactive Map Coming Soon</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                <span className="text-yellow-500">Starting Point</span>
                <span className="text-white">Lukla Airport</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                <span className="text-yellow-500">Destination</span>
                <span className="text-white">Everest Base Camp</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                <span className="text-yellow-500">Distance</span>
                <span className="text-white">130 km round trip</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

