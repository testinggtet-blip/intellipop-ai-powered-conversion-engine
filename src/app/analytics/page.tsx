"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  TrendingUp,
  TrendingDown,
  Users,
  MousePointerClick,
  DollarSign,
  Eye,
  Target,
  Zap,
  Brain,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    {
      label: "Total Impressions",
      value: "1.2M",
      change: "+23.5%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      label: "Click-Through Rate",
      value: "12.4%",
      change: "+5.2%",
      trend: "up",
      icon: MousePointerClick,
      color: "text-purple-600"
    },
    {
      label: "Conversion Rate",
      value: "8.7%",
      change: "+18.3%",
      trend: "up",
      icon: Target,
      color: "text-green-600"
    },
    {
      label: "Revenue Generated",
      value: "$284K",
      change: "+31.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600"
    }
  ];

  const campaigns = [
    { name: "Newsletter Signup", impressions: 425000, clicks: 52800, conversions: 8920, rate: "16.9%", status: "active" },
    { name: "Exit Intent Offer", impressions: 380000, clicks: 48200, conversions: 7340, rate: "15.2%", status: "active" },
    { name: "Free Trial CTA", impressions: 295000, clicks: 38350, conversions: 6120, rate: "16.0%", status: "active" },
    { name: "Limited Time Sale", impressions: 180000, clicks: 25200, conversions: 4536, rate: "18.0%", status: "paused" }
  ];

  const abTests = [
    {
      name: "Headline Test A/B",
      variant_a: { name: "Original", conversions: 1240, rate: "8.2%" },
      variant_b: { name: "Variant B", conversions: 1580, rate: "10.5%" },
      winner: "B",
      confidence: "98%"
    },
    {
      name: "Button Color Test",
      variant_a: { name: "Blue", conversions: 2100, rate: "12.1%" },
      variant_b: { name: "Green", conversions: 1890, rate: "10.8%" },
      winner: "A",
      confidence: "95%"
    }
  ];

  const aiInsights = [
    {
      title: "Peak Engagement Time",
      description: "Users are 3.2x more likely to convert between 2-4 PM on weekdays",
      action: "Adjust trigger timing",
      priority: "high"
    },
    {
      title: "Mobile Optimization",
      description: "Mobile conversion rate is 15% lower than desktop. Consider responsive design improvements",
      action: "Review mobile layout",
      priority: "medium"
    },
    {
      title: "Exit Intent Performance",
      description: "Exit intent pop-ups show 45% higher conversion than time-based triggers",
      action: "Increase exit intent usage",
      priority: "high"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="border-b border-border/40 bg-muted/30 px-4 py-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
                <p className="text-muted-foreground">Real-time insights and AI-powered recommendations</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 Days
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-5 border-border/50 bg-card/80 backdrop-blur hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${metric.color.split('-')[1]}-500/20 to-${metric.color.split('-')[1]}-600/20 flex items-center justify-center`}>
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      </div>
                      <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                        {metric.trend === "up" ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Performance */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Campaign Performance</h3>
                    <p className="text-sm text-muted-foreground">Track individual campaign metrics</p>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>

                <div className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div key={campaign.name} className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="font-medium">{campaign.name}</div>
                          <Badge variant={campaign.status === "active" ? "default" : "secondary"} className="text-xs">
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="text-sm font-semibold text-green-600">{campaign.rate}</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Impressions</div>
                          <div className="font-medium">{campaign.impressions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Clicks</div>
                          <div className="font-medium">{campaign.clicks.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Conversions</div>
                          <div className="font-medium">{campaign.conversions.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* A/B Test Results */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">A/B Test Results</h3>
                    <p className="text-sm text-muted-foreground">Compare variant performance</p>
                  </div>
                  <Button variant="outline" size="sm">New Test</Button>
                </div>

                <div className="space-y-4">
                  {abTests.map((test) => (
                    <div key={test.name} className="p-4 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-medium">{test.name}</div>
                        <Badge variant="secondary" className="text-xs">
                          {test.confidence} confidence
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-3 rounded-lg border ${test.winner === "A" ? "border-green-500/50 bg-green-500/5" : "border-border/50"}`}>
                          <div className="text-xs text-muted-foreground mb-1">Variant A</div>
                          <div className="font-semibold mb-1">{test.variant_a.name}</div>
                          <div className="text-sm">
                            <span className="font-medium">{test.variant_a.conversions}</span>
                            <span className="text-muted-foreground"> conversions</span>
                          </div>
                          <div className="text-lg font-bold text-green-600 mt-1">{test.variant_a.rate}</div>
                          {test.winner === "A" && (
                            <Badge variant="default" className="text-xs mt-2">Winner</Badge>
                          )}
                        </div>

                        <div className={`p-3 rounded-lg border ${test.winner === "B" ? "border-green-500/50 bg-green-500/5" : "border-border/50"}`}>
                          <div className="text-xs text-muted-foreground mb-1">Variant B</div>
                          <div className="font-semibold mb-1">{test.variant_b.name}</div>
                          <div className="text-sm">
                            <span className="font-medium">{test.variant_b.conversions}</span>
                            <span className="text-muted-foreground"> conversions</span>
                          </div>
                          <div className="text-lg font-bold text-green-600 mt-1">{test.variant_b.rate}</div>
                          {test.winner === "B" && (
                            <Badge variant="default" className="text-xs mt-2">Winner</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Insights */}
              <Card className="p-6 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">AI Insights</h3>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    New
                  </Badge>
                </div>

                <div className="space-y-3">
                  {aiInsights.map((insight) => (
                    <div key={insight.title} className="p-3 rounded-lg bg-background/50 border border-border/50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium text-sm">{insight.title}</div>
                        <Badge 
                          variant={insight.priority === "high" ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                        {insight.action} →
                      </Button>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Apply All Recommendations
                </Button>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Audience Insights</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Desktop</span>
                      <span className="font-medium">62%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: "62%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Mobile</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: "32%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Tablet</span>
                      <span className="font-medium">6%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: "6%" }} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Top Countries</h3>
                
                <div className="space-y-3">
                  {[
                    { country: "United States", percentage: 45, flag: "🇺🇸" },
                    { country: "United Kingdom", percentage: 22, flag: "🇬🇧" },
                    { country: "Canada", percentage: 15, flag: "🇨🇦" },
                    { country: "Australia", percentage: 12, flag: "🇦🇺" }
                  ].map((item) => (
                    <div key={item.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.flag}</span>
                        <span className="text-sm">{item.country}</span>
                      </div>
                      <span className="font-medium text-sm">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}