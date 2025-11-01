"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  Timer,
  MousePointerClick,
  LogOut,
  Scroll,
  Users,
  Globe,
  Smartphone,
  Clock,
  Zap,
  Target,
  Brain,
  Plus,
  Save,
  Play,
  Settings
} from "lucide-react";
import { useState } from "react";

export default function TriggersPage() {
  const [scrollDepth, setScrollDepth] = useState([50]);
  const [timeDelay, setTimeDelay] = useState([5]);
  const [inactivityTime, setInactivityTime] = useState([30]);

  const triggerTypes = [
    {
      icon: Timer,
      name: "Time Delay",
      description: "Show after user spends specified time on page",
      color: "from-blue-500 to-cyan-500",
      enabled: true
    },
    {
      icon: LogOut,
      name: "Exit Intent",
      description: "Detect when user is about to leave the page",
      color: "from-purple-500 to-pink-500",
      enabled: true
    },
    {
      icon: Scroll,
      name: "Scroll Depth",
      description: "Trigger after user scrolls to a certain depth",
      color: "from-green-500 to-emerald-500",
      enabled: false
    },
    {
      icon: MousePointerClick,
      name: "Click Trigger",
      description: "Show when user clicks specific element",
      color: "from-orange-500 to-red-500",
      enabled: false
    },
    {
      icon: Clock,
      name: "Inactivity",
      description: "Display after period of user inactivity",
      color: "from-indigo-500 to-blue-500",
      enabled: false
    },
    {
      icon: Brain,
      name: "AI Behavior",
      description: "Smart trigger based on user behavior patterns",
      color: "from-pink-500 to-rose-500",
      enabled: true,
      premium: true
    }
  ];

  const audienceRules = [
    { id: 1, type: "device", operator: "is", value: "desktop" },
    { id: 2, type: "traffic_source", operator: "contains", value: "google" }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="border-b border-border/40 bg-muted/30 px-4 py-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Smart Triggers</h1>
                <p className="text-muted-foreground">Configure when and how your pop-ups appear</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced
                </Button>
                <Button size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Trigger Types */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Trigger Conditions</h3>
                    <p className="text-sm text-muted-foreground">Select and configure trigger types</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Trigger
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {triggerTypes.map((trigger, index) => (
                    <motion.div
                      key={trigger.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className={`p-4 rounded-lg border ${trigger.enabled ? "border-primary/50 bg-primary/5" : "border-border/50"} hover:border-primary/50 transition-all relative overflow-hidden group cursor-pointer`}>
                        {trigger.premium && (
                          <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            Pro
                          </Badge>
                        )}
                        
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${trigger.color} p-2 group-hover:scale-110 transition-transform`}>
                            <trigger.icon className="w-full h-full text-white" />
                          </div>
                          <Switch checked={trigger.enabled} />
                        </div>

                        <h4 className="font-semibold mb-1">{trigger.name}</h4>
                        <p className="text-xs text-muted-foreground">{trigger.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Configuration */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Trigger Configuration</h3>

                <div className="space-y-6">
                  {/* Time Delay */}
                  <div className="p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-1.5">
                          <Timer className="w-full h-full text-white" />
                        </div>
                        <div>
                          <div className="font-medium">Time Delay</div>
                          <div className="text-xs text-muted-foreground">Show after {timeDelay[0]} seconds</div>
                        </div>
                      </div>
                      <Switch checked />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Delay: {timeDelay[0]}s</Label>
                      <Slider
                        value={timeDelay}
                        onValueChange={setTimeDelay}
                        min={0}
                        max={60}
                        step={5}
                      />
                    </div>
                  </div>

                  {/* Exit Intent */}
                  <div className="p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-1.5">
                          <LogOut className="w-full h-full text-white" />
                        </div>
                        <div>
                          <div className="font-medium">Exit Intent</div>
                          <div className="text-xs text-muted-foreground">Detect when user attempts to leave</div>
                        </div>
                      </div>
                      <Switch checked />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Sensitivity</span>
                        <Select defaultValue="medium">
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Mobile Detection</span>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  {/* Scroll Depth */}
                  <div className="p-4 rounded-lg border border-border/50 opacity-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 p-1.5">
                          <Scroll className="w-full h-full text-white" />
                        </div>
                        <div>
                          <div className="font-medium">Scroll Depth</div>
                          <div className="text-xs text-muted-foreground">Trigger at {scrollDepth[0]}% scroll</div>
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Scroll Depth: {scrollDepth[0]}%</Label>
                      <Slider
                        value={scrollDepth}
                        onValueChange={setScrollDepth}
                        min={0}
                        max={100}
                        step={10}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Audience Targeting */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Audience Targeting</h3>
                    <p className="text-sm text-muted-foreground">Define who sees your pop-up</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Rule
                  </Button>
                </div>

                <div className="space-y-3">
                  {audienceRules.map((rule) => (
                    <div key={rule.id} className="p-3 rounded-lg border border-border/50 flex items-center gap-3">
                      <Select value={rule.type}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="device">Device Type</SelectItem>
                          <SelectItem value="traffic_source">Traffic Source</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="new_visitor">New vs Returning</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={rule.operator}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="is">is</SelectItem>
                          <SelectItem value="is_not">is not</SelectItem>
                          <SelectItem value="contains">contains</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input value={rule.value} className="flex-1" />

                      <Button variant="ghost" size="sm">×</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Recommendations */}
              <Card className="p-6 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">AI Recommendations</h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="font-medium text-sm mb-1">Exit Intent Priority</div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Exit intent triggers show 45% higher conversion for your audience
                    </p>
                    <Badge variant="secondary" className="text-xs">Confidence: 92%</Badge>
                  </div>

                  <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="font-medium text-sm mb-1">Optimal Timing</div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Best results at 8-12 seconds for your traffic profile
                    </p>
                    <Badge variant="secondary" className="text-xs">Confidence: 87%</Badge>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Apply AI Settings
                </Button>
              </Card>

              {/* Preview */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Live Preview</h3>
                
                <div className="p-4 rounded-lg border-2 border-dashed border-border/50 text-center text-sm text-muted-foreground">
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Preview your trigger configuration</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Test Triggers
                  </Button>
                </div>
              </Card>

              {/* Stats */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Performance Impact</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Estimated CTR</span>
                      <span className="font-medium text-green-600">+18.5%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">User Annoyance Risk</span>
                      <span className="font-medium text-blue-600">Low</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: "25%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Conversion Potential</span>
                      <span className="font-medium text-purple-600">High</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Target className="w-4 h-4 mr-2" />
                    Load Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Clone from Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Import Settings
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}