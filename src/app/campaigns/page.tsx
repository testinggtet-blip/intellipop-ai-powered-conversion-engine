"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter } from
"@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Play, Pause, Copy, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "draft";
  template: string;
  target: string;
  views: number;
  conversions: number;
  conversionRate: number;
}

export default function CampaignsPage() {
  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [campaignName, setCampaignName] = useState("");
  const [template, setTemplate] = useState("");
  const [target, setTarget] = useState("new");
  const [segment, setSegment] = useState("");
  const [triggerType, setTriggerType] = useState("time-on-page");
  const [triggerValue, setTriggerValue] = useState("3");
  const [triggerUnit, setTriggerUnit] = useState("sec");
  const [displayWhere, setDisplayWhere] = useState("all-pages");
  const [urls, setUrls] = useState<string[]>(["https://zapier.com/blog"]);
  const [stopIfContainPage, setStopIfContainPage] = useState("https://zapier.com/blog");
  const [endCampaignOption, setEndCampaignOption] = useState("session");
  const [endAfterValue, setEndAfterValue] = useState("3");
  const [endAfterUnit, setEndAfterUnit] = useState("days");
  const [frequency, setFrequency] = useState("once-per-session");
  const [frequencyValue, setFrequencyValue] = useState("3");
  const [frequencyUnit, setFrequencyUnit] = useState("days");
  const [displayWhenOption, setDisplayWhenOption] = useState("over-take-replace");
  const [displayWhenValue, setDisplayWhenValue] = useState("30");
  const [displayWhenUnit, setDisplayWhenUnit] = useState("sec");
  const [preventIfSeenCampaign, setPreventIfSeenCampaign] = useState(false);

  // Mock campaigns data
  const [campaigns, setCampaigns] = useState<Campaign[]>([
  {
    id: "1",
    name: "Welcome Email Capture",
    status: "active",
    template: "Newsletter Signup",
    target: "New visitors",
    views: 1247,
    conversions: 89,
    conversionRate: 7.14
  },
  {
    id: "2",
    name: "Exit Intent - 15% Off",
    status: "active",
    template: "Exit Intent",
    target: "All visitors",
    views: 3421,
    conversions: 267,
    conversionRate: 7.8
  },
  {
    id: "3",
    name: "Free Shipping Offer",
    status: "paused",
    template: "Free Shipping",
    target: "Returning visitors",
    views: 892,
    conversions: 43,
    conversionRate: 4.82
  }]
  );

  const addUrl = () => {
    setUrls([...urls, ""]);
  };

  const removeUrl = (index: number) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleCreateCampaign = () => {
    // Validate required fields
    if (!campaignName.trim()) {
      toast.error("Campaign name is required");
      return;
    }

    // Create new campaign
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: campaignName,
      status: "draft",
      template: template || "Custom",
      target: target === "new" ? "New visitors" : target === "existing" ? "Returning visitors" : "All visitors",
      views: 0,
      conversions: 0,
      conversionRate: 0
    };

    setCampaigns([newCampaign, ...campaigns]);
    toast.success("Campaign created successfully!");

    // Reset form and close sheet
    resetForm();
    setCreateSheetOpen(false);
  };

  const resetForm = () => {
    setCampaignName("");
    setTemplate("");
    setTarget("new");
    setSegment("");
    setTriggerType("time-on-page");
    setTriggerValue("3");
    setTriggerUnit("sec");
    setDisplayWhere("all-pages");
    setUrls(["https://zapier.com/blog"]);
    setStopIfContainPage("https://zapier.com/blog");
    setEndCampaignOption("session");
    setEndAfterValue("3");
    setEndAfterUnit("days");
    setFrequency("once-per-session");
    setFrequencyValue("3");
    setFrequencyUnit("days");
    setDisplayWhenOption("over-take-replace");
    setDisplayWhenValue("30");
    setDisplayWhenUnit("sec");
    setPreventIfSeenCampaign(false);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
  campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showUrlFields = displayWhere === "selected-pages" || displayWhere === "except-pages";

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="border-b border-border/40 bg-muted/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Campaigns</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and create your pop-up campaigns
              </p>
            </div>
            <Button
              onClick={() => setCreateSheetOpen(true)}
              className="bg-[#1DBFAA] hover:bg-[#1DBFAA]/90">

              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search and Filters */}
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10" />

              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Campaigns Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold">Campaign Name</th>
                    <th className="text-left p-4 text-sm font-semibold">Status</th>
                    <th className="text-left p-4 text-sm font-semibold">Template</th>
                    <th className="text-left p-4 text-sm font-semibold">Target</th>
                    <th className="text-left p-4 text-sm font-semibold">Views</th>
                    <th className="text-left p-4 text-sm font-semibold">Conversions</th>
                    <th className="text-left p-4 text-sm font-semibold">Conv. Rate</th>
                    <th className="text-left p-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) =>
                  <tr
                    key={campaign.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors">

                      <td className="p-4">
                        <div className="font-medium">{campaign.name}</div>
                      </td>
                      <td className="p-4">
                        <Badge
                        variant={
                        campaign.status === "active" ?
                        "default" :
                        campaign.status === "paused" ?
                        "secondary" :
                        "outline"
                        }
                        className={
                        campaign.status === "active" ?
                        "bg-green-500/10 text-green-600 hover:bg-green-500/20" :
                        ""
                        }>

                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {campaign.template}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {campaign.target}
                      </td>
                      <td className="p-4 text-sm">{campaign.views.toLocaleString()}</td>
                      <td className="p-4 text-sm">{campaign.conversions.toLocaleString()}</td>
                      <td className="p-4 text-sm font-medium text-[#1DBFAA]">
                        {campaign.conversionRate.toFixed(2)}%
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            {campaign.status === "active" ?
                          <Pause className="w-4 h-4" /> :

                          <Play className="w-4 h-4" />
                          }
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {filteredCampaigns.length === 0 &&
              <div className="text-center py-12">
                  <p className="text-muted-foreground">No campaigns found</p>
                </div>
              }
            </div>
          </Card>
        </div>
      </div>

      {/* Create Campaign Sheet (Slides from right) */}
      <Sheet open={createSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto px-6">
          <SheetHeader className="pb-6 pt-2">
            <SheetTitle className="text-xl font-semibold !whitespace-pre-line">Create Campaign </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 pb-4">
            {/* Campaign Name */}
            <div className="space-y-2.5">
              <Label htmlFor="campaign-name" className="text-sm font-medium text-foreground">
                Campaign Name
              </Label>
              <Input
                id="campaign-name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name"
                className="h-10" />

            </div>

            {/* Template */}
            <div className="space-y-2.5">
              <Label htmlFor="template" className="text-sm font-medium text-foreground">
                Template
              </Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newsletter">Newsletter Signup</SelectItem>
                  <SelectItem value="exit-intent">Exit Intent</SelectItem>
                  <SelectItem value="free-shipping">Free Shipping</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Target</Label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="target"
                    value="new"
                    checked={target === "new"}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-4 h-4 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground">New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="target"
                    value="existing"
                    checked={target === "existing"}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-4 h-4 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground">Existing</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="target"
                    value="all"
                    checked={target === "all"}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-4 h-4 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground">All</span>
                </label>
              </div>
            </div>

            {/* Segment - Only show when target is "existing" */}
            {target === "existing" &&
            <div className="space-y-2">
                <Label htmlFor="segment" className="text-sm font-medium text-foreground">
                  Segment
                </Label>
                <Select value={segment} onValueChange={setSegment}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-value">High Value Customers</SelectItem>
                    <SelectItem value="cart-abandoners">Cart Abandoners</SelectItem>
                    <SelectItem value="repeat-buyers">Repeat Buyers</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }

            {/* When it has to Trigger */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">When it has to Trigger</Label>
              <Select value={triggerType} onValueChange={setTriggerType}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time-on-page">Time on Page</SelectItem>
                  <SelectItem value="scroll-depth">Scroll Depth</SelectItem>
                  <SelectItem value="exit-intent">Exit Intent</SelectItem>
                  <SelectItem value="on-load">On Load</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Where to Display */}
            <div className="space-y-2">
              <Label htmlFor="display-where" className="text-sm font-medium text-foreground">
                Where to Display
              </Label>
              <Select value={displayWhere} onValueChange={setDisplayWhere}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-pages">All Pages</SelectItem>
                  <SelectItem value="selected-pages">Selected Pages</SelectItem>
                  <SelectItem value="except-pages">Except Pages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* URL Fields - Show when Selected Pages or Except Pages */}
            {showUrlFields &&
            <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">URL</Label>
                <div className="space-y-2">
                  {urls.map((url, index) =>
                <div key={index} className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Input
                      type="url"
                      value={url}
                      onChange={(e) => updateUrl(index, e.target.value)}
                      placeholder="https://zapier.com/blog"
                      className="h-10 pr-8" />

                        {url &&
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                    }
                      </div>
                      {urls.length > 1 &&
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUrl(index)}
                    className="h-10 w-10 flex-shrink-0">

                          <X className="w-4 h-4" />
                        </Button>
                  }
                    </div>
                )}
                  <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addUrl}
                  className="h-10 w-10 bg-[#1DBFAA] text-white hover:bg-[#1DBFAA]/90 hover:text-white">

                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            }

            {/* Sessions Handling */}
            <div className="pt-4 border-t border-border space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Sessions Handling</h3>

              {/* Stop if contain page */}
              <div className="space-y-2">
                <Label htmlFor="stop-page" className="text-sm font-medium text-foreground">
                  Stop if contain page
                </Label>
                <Input
                  id="stop-page"
                  type="url"
                  value={stopIfContainPage}
                  onChange={(e) => setStopIfContainPage(e.target.value)}
                  placeholder="https://example.com"
                  className="h-10" />

              </div>

              {/* End campaign options */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="end-campaign"
                    value="session"
                    checked={endCampaignOption === "session"}
                    onChange={(e) => setEndCampaignOption(e.target.value)}
                    className="w-4 h-4 mt-0.5 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground leading-relaxed">End campaign after current session ends</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="end-campaign"
                    value="end-after"
                    checked={endCampaignOption === "end-after"}
                    onChange={(e) => setEndCampaignOption(e.target.value)}
                    className="w-4 h-4 mt-0.5 accent-[#1DBFAA]" />

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-foreground">End After</span>
                    <Input
                      type="number"
                      value={endAfterValue}
                      onChange={(e) => setEndAfterValue(e.target.value)}
                      disabled={endCampaignOption !== "end-after"}
                      className="w-20 h-8 text-sm" />

                    <Select
                      value={endAfterUnit}
                      onValueChange={setEndAfterUnit}
                      disabled={endCampaignOption !== "end-after"}>

                      <SelectTrigger className="w-24 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </label>
              </div>
            </div>

            {/* Frequency */}
            <div className="pt-4 border-t border-border space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Frequency</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value="once-per-session"
                    checked={frequency === "once-per-session"}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-4 h-4 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground">Start once per session</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value="once-every"
                    checked={frequency === "once-every"}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-4 h-4 mt-0.5 accent-[#1DBFAA]" />

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-foreground">Start once every</span>
                    <Input
                      type="number"
                      value={frequencyValue}
                      onChange={(e) => setFrequencyValue(e.target.value)}
                      disabled={frequency !== "once-every"}
                      className="w-20 h-8 text-sm" />

                    <Select
                      value={frequencyUnit}
                      onValueChange={setFrequencyUnit}
                      disabled={frequency !== "once-every"}>

                      <SelectTrigger className="w-24 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value="once-lifetime"
                    checked={frequency === "once-lifetime"}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-4 h-4 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground">Start only once in lifetime</span>
                </label>
              </div>
            </div>

            {/* Display When */}
            <div className="pt-4 border-t border-border space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Display When</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preventIfSeenCampaign}
                    onChange={(e) => setPreventIfSeenCampaign(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#1DBFAA]" />

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-foreground">Do not show if visitor has seen another campaign in last</span>
                    <Input
                      type="number"
                      value={displayWhenValue}
                      onChange={(e) => setDisplayWhenValue(e.target.value)}
                      disabled={!preventIfSeenCampaign}
                      className="w-20 h-8 text-sm" />

                    <Select
                      value={displayWhenUnit}
                      onValueChange={setDisplayWhenUnit}
                      disabled={!preventIfSeenCampaign}>

                      <SelectTrigger className="w-24 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sec">Sec</SelectItem>
                        <SelectItem value="min">Min</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="display-when"
                    value="over-take-replace"
                    checked={displayWhenOption === "over-take-replace"}
                    onChange={(e) => setDisplayWhenOption(e.target.value)}
                    className="w-4 h-4 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground">Over take and replace any other campaign</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="display-when"
                    value="over-take-contains"
                    checked={displayWhenOption === "over-take-contains"}
                    onChange={(e) => setDisplayWhenOption(e.target.value)}
                    className="w-4 h-4 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground">Over take and replace campaign contains</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="display-when"
                    value="do-not-trigger"
                    checked={displayWhenOption === "do-not-trigger"}
                    onChange={(e) => setDisplayWhenOption(e.target.value)}
                    className="w-4 h-4 accent-[#1DBFAA]" />

                  <span className="text-sm text-foreground">Do not trigger if another campaign is running</span>
                </label>
              </div>
            </div>
          </div>

          <SheetFooter className="border-t border-border pt-6 mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setCreateSheetOpen(false);
              }}
              className="flex-1">

              Cancel
            </Button>
            <Button
              onClick={handleCreateCampaign}
              className="flex-1 bg-[#1DBFAA] hover:bg-[#1DBFAA]/90">

              Save
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>);

}