"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Code,
  Server,
  Database,
  Zap,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Layers,
  Settings,
  GitBranch,
  Package,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

export default function DocsPage() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const installCode = `npm install @nexus-pop/sdk`;
  const embedCode = `<script src="https://cdn.nexuspop.io/v1/nexus-pop.min.js"></script>
<script>
  NexusPop.init({
    apiKey: 'YOUR_API_KEY',
    triggers: {
      exitIntent: true,
      timeDelay: 5000,
      scrollDepth: 50
    },
    targeting: {
      device: 'all',
      newVisitors: true
    }
  });
</script>`;

  const reactCode = `import { NexusPop } from '@nexus-pop/react';

function App() {
  return (
    <NexusPop
      apiKey="YOUR_API_KEY"
      triggers={{
        exitIntent: true,
        timeDelay: 5000
      }}
    >
      {/* Your app */}
    </NexusPop>
  );
}`;

  const architecture = [
    {
      layer: "Frontend SDK",
      tech: "JavaScript / React / Vue",
      description: "Lightweight SDK for triggering and displaying pop-ups",
      icon: Code
    },
    {
      layer: "API Gateway",
      tech: "NestJS / Express",
      description: "RESTful API for campaign management and analytics",
      icon: Server
    },
    {
      layer: "Database",
      tech: "PostgreSQL / Redis",
      description: "Campaign data, user profiles, and analytics storage",
      icon: Database
    },
    {
      layer: "Analytics Engine",
      tech: "ClickHouse / BigQuery",
      description: "Real-time event processing and reporting",
      icon: Zap
    }
  ];

  const features = [
    {
      title: "Smart Triggers",
      items: [
        "Exit intent detection",
        "Scroll depth tracking",
        "Time-based triggers",
        "User behavior analysis",
        "Custom event triggers"
      ]
    },
    {
      title: "Targeting",
      items: [
        "Device type segmentation",
        "Geographic targeting",
        "Traffic source filtering",
        "New vs. returning visitors",
        "Custom audience rules"
      ]
    },
    {
      title: "Analytics",
      items: [
        "Real-time conversion tracking",
        "A/B test results",
        "Heatmap generation",
        "Revenue attribution",
        "AI-powered insights"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="border-b border-border/40 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 px-4 py-12">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge className="mb-4">
              <BookOpen className="w-3 h-3 mr-2" />
              Documentation
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Technical Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate and customize Nexus Pop
            </p>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-12">
          <Tabs defaultValue="quickstart" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            {/* Quick Start */}
            <TabsContent value="quickstart" className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Get Started in 5 Minutes</h2>
                    <p className="text-muted-foreground">Install and integrate Nexus Pop</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">1</Badge>
                      <h3 className="font-semibold text-lg">Install the SDK</h3>
                    </div>
                    <Card className="bg-muted/30 p-4 border-border/50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Terminal className="w-4 h-4" />
                          <span>Terminal</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(installCode, "install")}
                        >
                          {copiedSnippet === "install" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <code className="text-sm font-mono">{installCode}</code>
                    </Card>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">2</Badge>
                      <h3 className="font-semibold text-lg">Add Embed Code</h3>
                    </div>
                    <Card className="bg-muted/30 p-4 border-border/50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Code className="w-4 h-4" />
                          <span>HTML</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(embedCode, "embed")}
                        >
                          {copiedSnippet === "embed" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <pre className="text-xs font-mono overflow-x-auto">
                        {embedCode}
                      </pre>
                    </Card>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">3</Badge>
                      <h3 className="font-semibold text-lg">Configure Your First Pop-up</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Visit the Builder page to create and customize your first pop-up campaign.
                    </p>
                    <Button>
                      Go to Builder
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* React Integration */}
              <Card className="p-8">
                <h3 className="text-xl font-bold mb-4">React Integration</h3>
                <p className="text-muted-foreground mb-4">
                  Using React? We have a dedicated component library:
                </p>
                <Card className="bg-muted/30 p-4 border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code className="w-4 h-4" />
                      <span>React Component</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(reactCode, "react")}
                    >
                      {copiedSnippet === "react" ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="text-xs font-mono overflow-x-auto">
                    {reactCode}
                  </pre>
                </Card>
              </Card>
            </TabsContent>

            {/* Architecture */}
            <TabsContent value="architecture" className="space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">System Architecture</h2>
                <p className="text-muted-foreground mb-8">
                  Nexus Pop is built on a modern, scalable architecture designed for high performance and reliability.
                </p>

                <div className="space-y-4">
                  {architecture.map((layer, index) => (
                    <motion.div
                      key={layer.layer}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 border-border/50 bg-muted/20">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <layer.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{layer.layer}</h3>
                              <Badge variant="secondary" className="text-xs">{layer.tech}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{layer.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Data Flow */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">User Journey Flow</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">User Visits Page</h4>
                      <p className="text-sm text-muted-foreground">SDK loads and initializes with configuration</p>
                    </div>
                  </div>

                  <div className="ml-4 h-8 w-px bg-border" />

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Behavior Tracking</h4>
                      <p className="text-sm text-muted-foreground">SDK monitors user actions, scroll depth, time on page</p>
                    </div>
                  </div>

                  <div className="ml-4 h-8 w-px bg-border" />

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Trigger Evaluation</h4>
                      <p className="text-sm text-muted-foreground">Conditions checked against targeting rules</p>
                    </div>
                  </div>

                  <div className="ml-4 h-8 w-px bg-border" />

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Pop-up Display</h4>
                      <p className="text-sm text-muted-foreground">Campaign renders with configured design and content</p>
                    </div>
                  </div>

                  <div className="ml-4 h-8 w-px bg-border" />

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Analytics Tracking</h4>
                      <p className="text-sm text-muted-foreground">Events sent to analytics engine for reporting</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* API Reference */}
            <TabsContent value="api" className="space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-green-600">GET</Badge>
                      <code className="text-sm font-mono">/api/campaigns</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Retrieve all campaigns</p>
                    <Card className="bg-muted/30 p-4 border-border/50">
                      <pre className="text-xs font-mono overflow-x-auto">
{`{
  "campaigns": [
    {
      "id": "camp_123",
      "name": "Newsletter Signup",
      "status": "active",
      "impressions": 425000,
      "conversions": 8920
    }
  ]
}`}
                      </pre>
                    </Card>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-blue-600">POST</Badge>
                      <code className="text-sm font-mono">/api/campaigns</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Create a new campaign</p>
                    <Card className="bg-muted/30 p-4 border-border/50">
                      <pre className="text-xs font-mono overflow-x-auto">
{`{
  "name": "Special Offer",
  "content": {
    "headline": "Get 20% Off",
    "cta": "Claim Offer"
  },
  "triggers": {
    "exitIntent": true,
    "timeDelay": 5000
  }
}`}
                      </pre>
                    </Card>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-orange-600">PUT</Badge>
                      <code className="text-sm font-mono">/api/campaigns/:id</code>
                    </div>
                    <p className="text-sm text-muted-foreground">Update an existing campaign</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-red-600">DELETE</Badge>
                      <code className="text-sm font-mono">/api/campaigns/:id</code>
                    </div>
                    <p className="text-sm text-muted-foreground">Delete a campaign</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">SDK Methods</h2>
                
                <div className="space-y-4">
                  <div>
                    <code className="text-sm font-mono font-semibold">NexusPop.init(config)</code>
                    <p className="text-sm text-muted-foreground mt-1">Initialize the SDK with configuration</p>
                  </div>
                  <div>
                    <code className="text-sm font-mono font-semibold">NexusPop.show(campaignId)</code>
                    <p className="text-sm text-muted-foreground mt-1">Manually trigger a specific campaign</p>
                  </div>
                  <div>
                    <code className="text-sm font-mono font-semibold">NexusPop.hide()</code>
                    <p className="text-sm text-muted-foreground mt-1">Close the currently displayed pop-up</p>
                  </div>
                  <div>
                    <code className="text-sm font-mono font-semibold">NexusPop.on(event, callback)</code>
                    <p className="text-sm text-muted-foreground mt-1">Listen to SDK events (shown, hidden, converted)</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Examples */}
            <TabsContent value="examples" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 h-full">
                      <h3 className="font-semibold text-lg mb-4">{feature.title}</h3>
                      <ul className="space-y-2">
                        {feature.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="p-8 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20">
                <div className="flex items-start gap-4">
                  <BookOpen className="w-8 h-8 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Need More Help?</h3>
                    <p className="text-muted-foreground mb-4">
                      Check out our comprehensive guides, video tutorials, and community forum for additional resources.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Guides
                      </Button>
                      <Button variant="outline">
                        <GitBranch className="w-4 h-4 mr-2" />
                        Community Forum
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}