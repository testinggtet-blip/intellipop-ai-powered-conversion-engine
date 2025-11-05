"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Type,
  Image as ImageIcon,
  Wand2,
  Eye,
  Save,
  Download,
  Sparkles,
  Layout,
  Maximize2,
  AlignLeft,
  Loader2,
  Copy,
  Check,
  FolderOpen,
  Plus,
  ChevronRight,
  Trash2,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  LayoutTemplate,
  Link as LinkIcon,
  Share2,
  CheckSquare,
  Circle,
  ChevronDown,
  ArrowDown,
  X,
  Edit,
  GripVertical,
  Upload,
  Video,
  Settings,
  Monitor,
  Smartphone
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Popup type configurations with dimensions
const POPUP_TYPES = [
  {
    id: "modal",
    name: "Modal Pop-up (Center Pop-up)",
    icon: "🎯",
    description: "Signup forms, limited-time offers, consent prompts",
    desktop: { width: 700, height: 500 },
    mobile: { width: "95%", height: 400 },
    backdrop: true,
    backdropOpacity: 0.6,
    borderRadius: 14,
    position: "center"
  },
  {
    id: "slide-in",
    name: "Slide-in Pop-up",
    icon: "📨",
    description: "Chat invites, product tips, newsletter signups",
    desktop: { width: 400, height: 320 },
    mobile: { width: "90%", height: "auto" },
    backdrop: false,
    backdropOpacity: 0,
    borderRadius: 12,
    position: "bottom-right"
  },
  {
    id: "floating-bar",
    name: "Floating Bar / Banner",
    icon: "📢",
    description: "Promotions, cookie consent, shipping alerts",
    desktop: { width: "100%", height: 80 },
    mobile: { width: "100%", height: 100 },
    backdrop: false,
    backdropOpacity: 0,
    borderRadius: 0,
    position: "top"
  },
  {
    id: "fullscreen",
    name: "Fullscreen Pop-up (Welcome Mat)",
    icon: "🖥️",
    description: "Lead magnets, discounts, newsletter signup",
    desktop: { width: 800, height: 600 },
    mobile: { width: "100%", height: "100%" },
    backdrop: true,
    backdropOpacity: 0.9,
    borderRadius: 0,
    position: "center"
  },
  {
    id: "exit-intent",
    name: "Exit-Intent Pop-up",
    icon: "🚪",
    description: "Retention offers, last-minute deals",
    desktop: { width: 700, height: 500 },
    mobile: { width: "90%", height: "auto" },
    backdrop: true,
    backdropOpacity: 0.7,
    borderRadius: 16,
    position: "center"
  },
  {
    id: "inline",
    name: "Inline Embedded Pop-up",
    icon: "📄",
    description: "Gated content, in-article forms, blog newsletter blocks",
    desktop: { width: "100%", height: "auto" },
    mobile: { width: "100%", height: "auto" },
    backdrop: false,
    backdropOpacity: 0,
    borderRadius: 8,
    position: "inline"
  },
  {
    id: "sidebar",
    name: "Sidebar Pop-up",
    icon: "📱",
    description: "Chat widgets, recommendations, quick forms",
    desktop: { width: 350, height: "100%" },
    mobile: { width: "100%", height: "85%" },
    backdrop: true,
    backdropOpacity: 0.4,
    borderRadius: 0,
    position: "right"
  }
];

export default function BuilderPage() {
  const [popupType, setPopupType] = useState("modal");
  const [viewMode, setViewMode] = useState("desktop"); // 'desktop' or 'mobile'
  
  const [popupFlow, setPopupFlow] = useState({
    name: "Sitewide Email Capture | Free Shipping",
    steps: [
    {
      id: "1",
      name: "Offer",
      type: "offer",
      headline: "",
      subheadline: "",
      buttonText: "Claim Offer",
      buttonUrl: "",
      backgroundColor: "#FFFFFF",
      textColor: "#493D34",
      buttonColor: "#EC5B31",
      borderRadius: 12,
      showImage: true,
      template: "offer",
      followUps: [],
      formFields: []
    }],

    typography: {
      headingFont: "Sora",
      headingWeight: 700,
      headingSize: 24,
      subheadingFont: "Sora",
      subheadingWeight: 400,
      subheadingSize: 14,
      bodyFont: "Sora",
      bodyWeight: 400,
      bodySize: 14,
      buttonFont: "Sora",
      buttonWeight: 600,
      buttonSize: 14
    },
    colors: [
    { name: "Primary", value: "#493D34", percentage: 100 },
    { name: "Background", value: "#FFFFFF", percentage: 30 },
    { name: "Accent", value: "#F0E7E1", percentage: 97 },
    { name: "Button", value: "#EC5B31", percentage: 100 },
    { name: "Border", value: "#CCCCCC", percentage: 100 }]

  });

  // Get current popup type config
  const currentPopupConfig = POPUP_TYPES.find(pt => pt.id === popupType) || POPUP_TYPES[0];
  
  // Get dimensions based on view mode
  const getDimensions = () => {
    const config = viewMode === "desktop" ? currentPopupConfig.desktop : currentPopupConfig.mobile;
    const baseWidth = typeof config.width === "string" ? config.width : `${config.width}px`;
    const baseHeight = typeof config.height === "string" ? config.height : `${config.height}px`;
    
    // If follow-up is active, double the width (or add extra space) to show side-by-side
    const isFollowUpActive = activeFollowUpId !== null;
    let finalWidth = baseWidth;
    
    if (isFollowUpActive && typeof config.width === "number") {
      finalWidth = `${config.width * 2 + 32}px`; // Double width + gap
    }
    
    return {
      width: finalWidth,
      height: baseHeight,
      maxWidth: typeof config.width === "string" ? "100%" : isFollowUpActive ? `${config.width * 2 + 32}px` : `${config.width}px`,
      maxHeight: typeof config.height === "string" ? "auto" : `${config.height}px`,
      singleWidth: baseWidth // Original width for individual popup
    };
  };

  // History management for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [activeStepId, setActiveStepId] = useState("1");
  const [activeFollowUpId, setActiveFollowUpId] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [editingElement, setEditingElement] = useState(null);
  const [draggedFieldIndex, setDraggedFieldIndex] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [settingsFollowUpId, setSettingsFollowUpId] = useState(null);
  const [draggedFieldType, setDraggedFieldType] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [dropTargetColumnId, setDropTargetColumnId] = useState(null);

  // Save to history whenever popupFlow changes
  const saveToHistory = (newFlow) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newFlow);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setPopupFlow(newFlow);
  };

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPopupFlow(history[historyIndex - 1]);
      toast.success("Undo successful");
    }
  };

  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPopupFlow(history[historyIndex + 1]);
      toast.success("Redo successful");
    }
  };

  // Initialize history with initial state
  useEffect(() => {
    if (history.length === 0) {
      setHistory([popupFlow]);
      setHistoryIndex(0);
    }
  }, []);

  const templates = [
  {
    name: "Blank Canvas",
    preview: "📝",
    description: "Start from scratch with a blank popup",
    gradient: "from-gray-400 to-gray-600",
    type: "custom",
    config: {
      headline: "Your Headline Here",
      subheadline: "Add your message here",
      buttonText: "Click Here",
      buttonUrl: "",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      buttonColor: "#000000",
      borderRadius: 8,
      showImage: false
    }
  },
  {
    name: "Newsletter Signup",
    preview: "📧",
    description: "Clean, minimal design for email collection",
    gradient: "from-blue-500 to-cyan-500",
    type: "email-capture",
    config: {
      headline: "Join Our Newsletter",
      subheadline: "Get weekly updates and exclusive offers",
      buttonText: "Subscribe Now",
      buttonUrl: "",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      buttonColor: "#3b82f6",
      borderRadius: 8,
      showImage: false
    }
  },
  {
    name: "Exit Intent",
    preview: "🚪",
    description: "Catch visitors before they leave",
    gradient: "from-purple-500 to-pink-500",
    type: "offer",
    config: {
      headline: "Wait! Don't Leave Yet",
      subheadline: "Get 15% off before you go",
      buttonText: "Claim Discount",
      buttonUrl: "",
      backgroundColor: "#a855f7",
      textColor: "#ffffff",
      buttonColor: "#ffffff",
      borderRadius: 16,
      showImage: true
    }
  },
  {
    name: "Limited Offer",
    preview: "⚡",
    description: "Urgency-driven conversion template",
    gradient: "from-orange-500 to-red-500",
    type: "offer",
    config: {
      headline: "⚡ Flash Sale - 50% Off!",
      subheadline: "Limited time offer. Hurry before it ends!",
      buttonText: "Shop Now",
      buttonUrl: "",
      backgroundColor: "#ef4444",
      textColor: "#ffffff",
      buttonColor: "#fbbf24",
      borderRadius: 12,
      showImage: true
    }
  },
  {
    name: "Video Popup",
    preview: "🎥",
    description: "Engage with video content",
    gradient: "from-green-500 to-emerald-500",
    type: "custom",
    config: {
      headline: "Watch Our Demo",
      subheadline: "See how it works in 2 minutes",
      buttonText: "Play Video",
      buttonUrl: "",
      backgroundColor: "#10b981",
      textColor: "#ffffff",
      buttonColor: "#ffffff",
      borderRadius: 20,
      showImage: true
    }
  },
  {
    name: "Thank You",
    preview: "✅",
    description: "Confirmation message",
    gradient: "from-green-400 to-emerald-600",
    type: "confirmation",
    config: {
      headline: "Thank You!",
      subheadline: "Check your email for your discount code",
      buttonText: "Continue Shopping",
      buttonUrl: "",
      backgroundColor: "#f3f4f6",
      textColor: "#111827",
      buttonColor: "#10b981",
      borderRadius: 8,
      showImage: true
    }
  },
  {
    name: "Free Shipping",
    preview: "📦",
    description: "Free shipping offer",
    gradient: "from-orange-400 to-red-500",
    type: "offer",
    config: {
      headline: "You've Got Free Shipping",
      subheadline: "Get free shipping on your order today",
      buttonText: "Claim Offer",
      buttonUrl: "",
      backgroundColor: "#FFFFFF",
      textColor: "#493D34",
      buttonColor: "#EC5B31",
      borderRadius: 12,
      showImage: true
    }
  }];


  const applyTemplate = (template) => {
    const newStep = {
      id: Date.now().toString(),
      name: template.name,
      type: template.type,
      template: template.name.toLowerCase().replace(/\s+/g, '-'),
      ...template.config,
      followUps: [],
      formFields: []
    };

    setPopupFlow({
      ...popupFlow,
      steps: [...popupFlow.steps, newStep]
    });

    setActiveStepId(newStep.id);
    setActiveFollowUpId(null);
    setTemplateDialogOpen(false);
    toast.success(`Added ${template.name} step`);
  };

  const addStep = () => {
    setTemplateDialogOpen(true);
  };

  const addFollowUpStep = (parentStepId) => {
    const parentStep = popupFlow.steps.find((s) => s.id === parentStepId);
    if (!parentStep) return;

    // Duplicate the parent step's config for the follow-up
    const newFollowUpId = `${parentStepId}-fu-${Date.now()}`;
    const newFollowUp = {
      id: newFollowUpId,
      name: "Follow-up",
      type: "follow-up",
      headline: parentStep.headline,
      subheadline: parentStep.subheadline,
      buttonText: parentStep.buttonText,
      buttonUrl: parentStep.buttonUrl,
      backgroundColor: parentStep.backgroundColor,
      textColor: parentStep.textColor,
      buttonColor: parentStep.buttonColor,
      borderRadius: parentStep.borderRadius,
      showImage: parentStep.showImage,
      backgroundImage: parentStep.backgroundImage,
      formFields: parentStep.formFields ? [...parentStep.formFields] : []
    };

    setPopupFlow({
      ...popupFlow,
      steps: popupFlow.steps.map((step) =>
      step.id === parentStepId ?
      {
        ...step,
        followUps: [
        ...(step.followUps || []),
        newFollowUp]

      } :
      step
      )
    });
    toast.success("Follow-up step added (duplicated from main step)");
  };

  const deleteStep = (stepId) => {
    if (popupFlow.steps.length === 1) {
      toast.error("Cannot delete the only step");
      return;
    }

    const newSteps = popupFlow.steps.filter((s) => s.id !== stepId);
    setPopupFlow({ ...popupFlow, steps: newSteps });

    if (activeStepId === stepId) {
      setActiveStepId(newSteps[0].id);
      setActiveFollowUpId(null);
    }

    toast.success("Step deleted");
  };

  const deleteFollowUp = (stepId, followUpId) => {
    setPopupFlow({
      ...popupFlow,
      steps: popupFlow.steps.map((step) =>
      step.id === stepId ?
      {
        ...step,
        followUps: (step.followUps || []).filter((fu) => fu.id !== followUpId)
      } :
      step
      )
    });

    if (activeFollowUpId === followUpId) {
      setActiveFollowUpId(null);
    }

    toast.success("Follow-up deleted");
  };

  const addFormField = (fieldType) => {
    if (!activeStep && !activeFollowUp) return;

    const newField = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
      placeholder: fieldType === "text" || fieldType === "textarea" || fieldType === "url" ? "Enter value..." : undefined,
      options: fieldType === "dropdown" || fieldType === "radio" ? ["Option 1", "Option 2", "Option 3"] : undefined,
      columnCount: fieldType === "columns" ? 2 : undefined,
      columnVariant: fieldType === "columns" ? "equal" : undefined,
      fields: fieldType === "columns" ? [] : undefined
    };

    if (activeFollowUpId && activeFollowUp) {
      updateActiveFollowUp({
        formFields: [...(activeFollowUp.formFields || []), newField]
      });
    } else if (activeStep) {
      updateActiveStep({
        formFields: [...(activeStep.formFields || []), newField]
      });
    }

    toast.success(`Added ${fieldType} field`);
  };

  const addFieldToColumn = (columnFieldId, fieldType) => {
    const newField = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}`,
      placeholder: fieldType === "text" || fieldType === "textarea" || fieldType === "url" ? "Enter value..." : undefined,
      options: fieldType === "dropdown" || fieldType === "radio" ? ["Option 1", "Option 2"] : undefined
    };

    if (activeFollowUpId && activeFollowUp) {
      updateActiveFollowUp({
        formFields: (activeFollowUp.formFields || []).map((f) =>
          f.id === columnFieldId ? { ...f, fields: [...(f.fields || []), newField] } : f
        )
      });
    } else if (activeStep) {
      updateActiveStep({
        formFields: (activeStep.formFields || []).map((f) =>
          f.id === columnFieldId ? { ...f, fields: [...(f.fields || []), newField] } : f
        )
      });
    }

    toast.success(`Added ${fieldType} to column`);
  };

  const removeFieldFromColumn = (columnFieldId, fieldId) => {
    if (activeFollowUpId && activeFollowUp) {
      updateActiveFollowUp({
        formFields: (activeFollowUp.formFields || []).map((f) =>
          f.id === columnFieldId ? { ...f, fields: (f.fields || []).filter(cf => cf.id !== fieldId) } : f
        )
      });
    } else if (activeStep) {
      updateActiveStep({
        formFields: (activeStep.formFields || []).map((f) =>
          f.id === columnFieldId ? { ...f, fields: (f.fields || []).filter(cf => cf.id !== fieldId) } : f
        )
      });
    }
    
    toast.success("Field removed from column");
  };

  const updateColumnField = (columnFieldId, fieldId, updates) => {
    if (activeFollowUpId && activeFollowUp) {
      updateActiveFollowUp({
        formFields: (activeFollowUp.formFields || []).map((f) =>
          f.id === columnFieldId ? {
            ...f,
            fields: (f.fields || []).map(cf => cf.id === fieldId ? { ...cf, ...updates } : cf)
          } : f
        )
      });
    } else if (activeStep) {
      updateActiveStep({
        formFields: (activeStep.formFields || []).map((f) =>
          f.id === columnFieldId ? {
            ...f,
            fields: (f.fields || []).map(cf => cf.id === fieldId ? { ...cf, ...updates } : cf)
          } : f
        )
      });
    }
  };

  const insertMergeTag = (tag) => {
    // Check what element is currently being edited
    if (editingElement === "headline") {
      const currentValue = activeFollowUp?.headline || activeStep?.headline || "";
      const position = cursorPosition ?? currentValue.length;
      const newValue = currentValue.slice(0, position) + tag + currentValue.slice(position);
      
      if (activeFollowUpId && activeFollowUp) {
        updateActiveFollowUp({ headline: newValue });
      } else if (activeStep) {
        updateActiveStep({ headline: newValue });
      }
      toast.success(`Added ${tag} to headline`);
    } else if (editingElement === "subheadline") {
      const currentValue = activeFollowUp?.subheadline || activeStep?.subheadline || "";
      const position = cursorPosition ?? currentValue.length;
      const newValue = currentValue.slice(0, position) + tag + currentValue.slice(position);
      
      if (activeFollowUpId && activeFollowUp) {
        updateActiveFollowUp({ subheadline: newValue });
      } else if (activeStep) {
        updateActiveStep({ subheadline: newValue });
      }
      toast.success(`Added ${tag} to subheadline`);
    } else if (editingElement === "button") {
      const currentValue = activeFollowUp?.buttonText || activeStep?.buttonText || "";
      const position = cursorPosition ?? currentValue.length;
      const newValue = currentValue.slice(0, position) + tag + currentValue.slice(position);
      
      if (activeFollowUpId && activeFollowUp) {
        updateActiveFollowUp({ buttonText: newValue });
      } else if (activeStep) {
        updateActiveStep({ buttonText: newValue });
      }
      toast.success(`Added ${tag} to button`);
    } else if (editingFieldId) {
      // Insert into form field
      const field = activeFollowUp?.formFields?.find(f => f.id === editingFieldId) ||
                    activeStep?.formFields?.find(f => f.id === editingFieldId);
      
      if (field && (field.type === "text" || field.type === "textarea" || field.type === "url")) {
        const currentValue = field.placeholder || "";
        const position = cursorPosition ?? currentValue.length;
        const newValue = currentValue.slice(0, position) + tag + currentValue.slice(position);
        updateFormField(editingFieldId, { placeholder: newValue });
        toast.success(`Added ${tag} to form field`);
      }
    } else {
      // No element is being edited, default to headline
      const currentValue = activeFollowUp?.headline || activeStep?.headline || "";
      const newValue = currentValue + (currentValue ? " " : "") + tag;
      
      if (activeFollowUpId && activeFollowUp) {
        updateActiveFollowUp({ headline: newValue });
      } else if (activeStep) {
        updateActiveStep({ headline: newValue });
      }
      toast.success(`Added ${tag} to headline`);
    }
  };

  const removeFormField = (fieldId) => {
    if (activeFollowUpId && activeFollowUp) {
      updateActiveFollowUp({
        formFields: (activeFollowUp.formFields || []).filter((f) => f.id !== fieldId)
      });
    } else if (activeStep) {
      updateActiveStep({
        formFields: (activeStep.formFields || []).filter((f) => f.id !== fieldId)
      });
    }

    setEditingFieldId(null);
    toast.success("Field removed");
  };

  const updateFormField = (fieldId, updates) => {
    if (activeFollowUpId && activeFollowUp) {
      updateActiveFollowUp({
        formFields: (activeFollowUp.formFields || []).map((f) =>
        f.id === fieldId ? { ...f, ...updates } : f
        )
      });
    } else if (activeStep) {
      updateActiveStep({
        formFields: (activeStep.formFields || []).map((f) =>
        f.id === fieldId ? { ...f, ...updates } : f
        )
      });
    }
  };

  const reorderFormField = (fromIndex, toIndex) => {
    const fields = activeFollowUpId && activeFollowUp ?
    activeFollowUp.formFields || [] :
    activeStep?.formFields || [];

    const newFields = [...fields];
    const [removed] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, removed);

    if (activeFollowUpId && activeFollowUp) {
      updateActiveFollowUp({ formFields: newFields });
    } else if (activeStep) {
      updateActiveStep({ formFields: newFields });
    }
  };

  const addOption = (fieldId) => {
    const field = activeFollowUpId && activeFollowUp ?
    activeFollowUp.formFields?.find((f) => f.id === fieldId) :
    activeStep?.formFields?.find((f) => f.id === fieldId);

    if (!field || !field.options && field.type !== "dropdown" && field.type !== "radio") return;

    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    updateFormField(fieldId, { options: newOptions });
  };

  const removeOption = (fieldId, optionIndex) => {
    const field = activeFollowUpId && activeFollowUp ?
    activeFollowUp.formFields?.find((f) => f.id === fieldId) :
    activeStep?.formFields?.find((f) => f.id === fieldId);

    if (!field || !field.options) return;

    const newOptions = field.options.filter((_, i) => i !== optionIndex);
    updateFormField(fieldId, { options: newOptions });
  };

  const updateOption = (fieldId, optionIndex, value) => {
    const field = activeFollowUpId && activeFollowUp ?
    activeFollowUp.formFields?.find((f) => f.id === fieldId) :
    activeStep?.formFields?.find((f) => f.id === fieldId);

    if (!field || !field.options) return;

    const newOptions = field.options.map((opt, i) => i === optionIndex ? value : opt);
    updateFormField(fieldId, { options: newOptions });
  };

  const duplicateStep = (stepId) => {
    const stepToDuplicate = popupFlow.steps.find((s) => s.id === stepId);
    if (!stepToDuplicate) return;

    const newStep = {
      ...stepToDuplicate,
      id: Date.now().toString(),
      name: `${stepToDuplicate.name} (Copy)`,
      followUps: stepToDuplicate.followUps ? stepToDuplicate.followUps.map((fu) => ({
        ...fu,
        id: `${Date.now()}-fu-${Math.random()}`
      })) : []
    };

    setPopupFlow({
      ...popupFlow,
      steps: [...popupFlow.steps, newStep]
    });

    setActiveStepId(newStep.id);
    setActiveFollowUpId(null);
    toast.success("Step duplicated successfully");
  };

  const duplicateFollowUp = (stepId, followUpId) => {
    const parentStep = popupFlow.steps.find((s) => s.id === stepId);
    const followUpToDuplicate = parentStep?.followUps?.find((fu) => fu.id === followUpId);

    if (!followUpToDuplicate || !parentStep) return;

    const newFollowUp = {
      ...followUpToDuplicate,
      id: `${stepId}-fu-${Date.now()}`,
      name: `${followUpToDuplicate.name} (Copy)`
    };

    setPopupFlow({
      ...popupFlow,
      steps: popupFlow.steps.map((step) =>
      step.id === stepId ?
      {
        ...step,
        followUps: [...(step.followUps || []), newFollowUp]
      } :
      step
      )
    });

    toast.success("Follow-up duplicated successfully");
  };

  const updateActiveStep = (updates) => {
    const newFlow = {
      ...popupFlow,
      steps: popupFlow.steps.map((step) =>
      step.id === activeStepId ? { ...step, ...updates } : step
      )
    };
    saveToHistory(newFlow);
  };

  const updateActiveFollowUp = (updates) => {
    const newFlow = {
      ...popupFlow,
      steps: popupFlow.steps.map((step) =>
      step.id === activeStepId ?
      {
        ...step,
        followUps: (step.followUps || []).map((fu) =>
        fu.id === activeFollowUpId ? { ...fu, ...updates } : fu
        )
      } :
      step
      )
    };
    saveToHistory(newFlow);
  };

  const activeStep = popupFlow.steps.find((s) => s.id === activeStepId);
  const activeFollowUp = activeStep?.followUps?.find((fu) => fu.id === activeFollowUpId);

  // Debug useEffect
  useEffect(() => {
    console.log("🔍 DEBUG INFO:");
    console.log("- activeStepId:", activeStepId);
    console.log("- activeFollowUpId:", activeFollowUpId);
    console.log("- activeStep exists:", !!activeStep);
    console.log("- activeFollowUp exists:", !!activeFollowUp);
    if (activeStep?.followUps) {
      console.log("- Available follow-ups:", activeStep.followUps.map(f => ({ id: f.id, name: f.name })));
    }
  }, [activeStepId, activeFollowUpId, activeStep, activeFollowUp]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/popups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: popupFlow.name,
          ...popupFlow.steps[0],
          flowData: JSON.stringify(popupFlow)
        })
      });

      if (!response.ok) throw new Error("Failed to save");

      const saved = await response.json();
      toast.success("Popup flow saved successfully!");
    } catch (error) {
      toast.error("Failed to save popup");
    } finally {
      setSaving(false);
    }
  };

  // Handle drag from sidebar
  const handleFieldDragStart = (fieldType) => {
    setDraggedFieldType(fieldType);
  };

  // Handle drop into canvas
  const handleCanvasDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedFieldType) {
      addFormField(draggedFieldType);
      setDraggedFieldType(null);
      setDropTargetIndex(null);
    }
  };

  // Handle drop into specific position
  const handleFieldDrop = (targetIndex) => {
    if (draggedFieldType) {
      const newField = {
        id: `field-${Date.now()}`,
        type: draggedFieldType,
        label: `${draggedFieldType.charAt(0).toUpperCase() + draggedFieldType.slice(1)} Field`,
        placeholder: draggedFieldType === "text" || draggedFieldType === "textarea" || draggedFieldType === "url" ? "Enter value..." : undefined,
        options: draggedFieldType === "dropdown" || draggedFieldType === "radio" ? ["Option 1", "Option 2", "Option 3"] : undefined,
        columnCount: draggedFieldType === "columns" ? 2 : undefined,
        columnVariant: draggedFieldType === "columns" ? "equal" : undefined,
        fields: draggedFieldType === "columns" ? [] : undefined
      };

      const currentFields = activeFollowUpId && activeFollowUp ?
        activeFollowUp.formFields || [] :
        activeStep?.formFields || [];

      const newFields = [...currentFields];
      newFields.splice(targetIndex, 0, newField);

      if (activeFollowUpId && activeFollowUp) {
        updateActiveFollowUp({ formFields: newFields });
      } else if (activeStep) {
        updateActiveStep({ formFields: newFields });
      }

      setDraggedFieldType(null);
      setDropTargetIndex(null);
      toast.success(`Added ${draggedFieldType} field`);
    } else if (draggedFieldIndex !== null && draggedFieldIndex !== targetIndex) {
      reorderFormField(draggedFieldIndex, targetIndex);
      setDraggedFieldIndex(null);
      setDropTargetIndex(null);
    }
  };

  // Handle drop into column
  const handleColumnDrop = (columnFieldId) => {
    if (draggedFieldType) {
      addFieldToColumn(columnFieldId, draggedFieldType);
      setDraggedFieldType(null);
      setDropTargetColumnId(null);
    }
  };

  const renderStepPreview = (
    config,
    isActive,
    isFollowUp = false
  ) => {
    return (
      <div
        className="bg-background rounded-lg shadow-lg border border-border overflow-hidden transition-all hover:shadow-xl relative"
        style={{
          backgroundColor: config.backgroundColor,
          color: config.textColor,
          borderRadius: `${config.borderRadius}px`,
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="p-6 text-center relative z-10" style={config.backgroundImage ? { backgroundColor: 'rgba(0,0,0,0.4)' } : {}}>
          {/* Icon */}
          {config.showImage && (
            <div 
              className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center relative group ${
                isActive ? "cursor-pointer" : ""
              }`}
              onClick={(e) => {
                if (isActive) {
                  e.stopPropagation();
                  setEditingElement("icon");
                }
              }}
            >
              <Sparkles className="w-8 h-8 text-white" />
              
              {isActive && editingElement === "icon" && (
                <div className="absolute -top-2 -right-2 flex gap-1 z-20">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFollowUp && activeFollowUpId) {
                        updateActiveFollowUp({ showImage: false });
                      } else {
                        updateActiveStep({ showImage: false });
                      }
                      setEditingElement(null);
                    }}
                    title="Remove icon"
                  >
                    <X className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Headline */}
          <div
            className={`text-lg font-bold mb-2 !whitespace-pre-line relative group ${isActive ? "cursor-text hover:ring-2 hover:ring-[#1DBFAA]/50 rounded px-2 py-1 transition-all" : ""} ${
              editingElement === "headline" && isActive ? "ring-2 ring-[#1DBFAA]" : ""
            }`}
            style={{
              color: config.backgroundImage ? '#ffffff' : config.textColor,
              fontSize: `${popupFlow.typography.headingSize}px`,
              fontWeight: popupFlow.typography.headingWeight
            }}
            onClick={(e) => {
              if (isActive) {
                e.stopPropagation();
                setEditingElement("headline");
              }
            }}
          >
            {isActive && editingElement === "headline" && !editingElement.includes("input") && (
              <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isFollowUp && activeFollowUpId) {
                      updateActiveFollowUp({ headline: "" });
                    } else {
                      updateActiveStep({ headline: "" });
                    }
                    setEditingElement(null);
                  }}
                  title="Remove headline"
                >
                  <X className="w-3 h-3 text-destructive" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                  title="Reorder"
                >
                  <GripVertical className="w-3 h-3" />
                </Button>
              </div>
            )}

            {editingElement === "headline" && isActive ? (
              <Input
                value={config.headline}
                onChange={(e) => {
                  if (isFollowUp && activeFollowUpId) {
                    updateActiveFollowUp({ headline: e.target.value });
                  } else {
                    updateActiveStep({ headline: e.target.value });
                  }
                }}
                onSelect={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onClick={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onKeyUp={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onBlur={() => setEditingElement(null)}
                autoFocus
                className="text-lg font-bold text-center"
                style={{ color: config.backgroundImage ? '#ffffff' : config.textColor }}
              />
            ) : (
              config.headline
            )}
          </div>
          
          {/* Subheadline */}
          <div
            className={`text-sm mb-4 !whitespace-pre-line relative group ${isActive ? "cursor-text hover:ring-2 hover:ring-[#1DBFAA]/50 rounded px-2 py-1 transition-all" : ""} ${
              editingElement === "subheadline" && isActive ? "ring-2 ring-[#1DBFAA]" : ""
            }`}
            style={{
              color: config.backgroundImage ? '#ffffff' : config.textColor,
              opacity: 0.9,
              fontSize: `${popupFlow.typography.subheadingSize}px`,
              fontWeight: popupFlow.typography.subheadingWeight
            }}
            onClick={(e) => {
              if (isActive) {
                e.stopPropagation();
                setEditingElement("subheadline");
              }
            }}
          >
            {isActive && editingElement === "subheadline" && (
              <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isFollowUp && activeFollowUpId) {
                      updateActiveFollowUp({ subheadline: "" });
                    } else {
                      updateActiveStep({ subheadline: "" });
                    }
                    setEditingElement(null);
                  }}
                  title="Remove subheadline"
                >
                  <X className="w-3 h-3 text-destructive" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                  title="Reorder"
                >
                  <GripVertical className="w-3 h-3" />
                </Button>
              </div>
            )}

            {editingElement === "subheadline" && isActive ? (
              <Input
                value={config.subheadline}
                onChange={(e) => {
                  if (isFollowUp && activeFollowUpId) {
                    updateActiveFollowUp({ subheadline: e.target.value });
                  } else {
                    updateActiveStep({ subheadline: e.target.value });
                  }
                }}
                onSelect={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onClick={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onKeyUp={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onBlur={() => setEditingElement(null)}
                autoFocus
                className="text-sm text-center"
                style={{ color: config.backgroundImage ? '#ffffff' : config.textColor }}
              />
            ) : (
              config.subheadline
            )}
          </div>
          
          {/* Render custom form fields with drag and drop */}
          {config.formFields && config.formFields.length > 0 && (
            <div 
              className="space-y-2 mb-4"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isActive) {
                  handleCanvasDrop(e);
                }
              }}
            >
              {config.formFields.map((field, index) => (
                <div
                  key={field.id}
                  draggable={isActive}
                  onDragStart={() => setDraggedFieldIndex(index)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (draggedFieldIndex !== null && draggedFieldIndex !== index) {
                      reorderFormField(draggedFieldIndex, index);
                      setDraggedFieldIndex(index);
                    }
                  }}
                  onDragEnd={() => setDraggedFieldIndex(null)}
                  className={`text-left relative group ${isActive ? "cursor-move" : ""}`}
                >
                  {isActive && (
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  
                  {field.type === "text" && (
                    <div>
                      <Label className="text-xs mb-1">{field.label}</Label>
                      <Input placeholder={field.placeholder} className="text-xs h-8" disabled />
                    </div>
                  )}
                  {field.type === "textarea" && (
                    <div
                      className={`text-left relative group ${isActive ? "cursor-text hover:ring-2 hover:ring-[#1DBFAA]/50 rounded px-2 py-1 transition-all" : ""} ${
                        editingFieldId === field.id && isActive ? "ring-2 ring-[#1DBFAA]" : ""
                      }`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove text area"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            title="Reorder"
                          >
                            <GripVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {editingFieldId === field.id && isActive ? (
                        <Textarea
                          value={field.content || ""}
                          onChange={(e) => updateFormField(field.id, { content: e.target.value })}
                          onBlur={() => setEditingFieldId(null)}
                          autoFocus
                          className="text-xs min-h-[80px]"
                          style={{ color: config.textColor }}
                          placeholder="Enter text content (multi-line)"
                        />
                      ) : (
                        <p className="text-xs whitespace-pre-line" style={{ color: config.textColor, opacity: 0.9 }}>
                          {field.content || "Multi-line text content goes here..."}
                        </p>
                      )}
                    </div>
                  )}
                  {field.type === "url" && (
                    <div>
                      <Label className="text-xs mb-1">{field.label}</Label>
                      <Input type="url" placeholder={field.placeholder} className="text-xs h-8" disabled />
                    </div>
                  )}
                  {field.type === "image" && (
                    <div>
                      <Label className="text-xs mb-1">{field.label}</Label>
                      {field.fileUrl ? (
                        <div className="relative w-full h-24 rounded border border-border overflow-hidden">
                          <img src={field.fileUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 text-xs" disabled>
                            <ImageIcon className="w-3 h-3 mr-1" />
                            Upload Image
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  {field.type === "video" && (
                    <div
                      className={`relative group ${isActive ? "cursor-pointer hover:ring-2 hover:ring-[#1DBFAA]/50 rounded transition-all" : ""} ${
                        editingFieldId === field.id && isActive ? "ring-2 ring-[#1DBFAA]" : ""
                      }`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove video"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            title="Reorder"
                          >
                            <GripVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {editingFieldId === field.id && isActive ? (
                        <div className="space-y-1">
                          <Label className="text-xs">Video URL</Label>
                          <Input
                            value={field.fileUrl || ""}
                            onChange={(e) => updateFormField(field.id, { fileUrl: e.target.value })}
                            onBlur={() => setEditingFieldId(null)}
                            className="text-xs h-7"
                            placeholder="https://example.com/video.mp4"
                          />
                          <p className="text-xs text-muted-foreground">Paste video URL (mp4, webm, or YouTube embed)</p>
                        </div>
                      ) : (
                        <>
                          {field.fileUrl ? (
                            <div className="relative w-full h-32 rounded border border-border overflow-hidden bg-black">
                              {field.fileUrl.includes('youtube.com') || field.fileUrl.includes('youtu.be') ? (
                                <iframe 
                                  src={field.fileUrl.replace('watch?v=', 'embed/')} 
                                  className="w-full h-full" 
                                  allowFullScreen 
                                />
                              ) : (
                                <video src={field.fileUrl} className="w-full h-full object-cover" controls />
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-32 border border-dashed border-border rounded bg-muted/30">
                              <div className="text-center">
                                <Video className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                                <span className="text-xs text-muted-foreground">Click to add video</span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {field.type === "button" && (
                    <Button variant="outline" size="sm" className="w-full text-xs" disabled>
                      {field.label}
                    </Button>
                  )}
                  {field.type === "socials" && (
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center gap-2">
                      <input type="checkbox" disabled className="w-4 h-4" />
                      <span className="text-xs">{field.label}</span>
                    </div>
                  )}
                  {field.type === "radio" && (
                    <div className="space-y-1">
                      <Label className="text-xs mb-1">{field.label}</Label>
                      {field.options?.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input type="radio" name={field.id} disabled className="w-4 h-4" />
                          <span className="text-xs">{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {field.type === "dropdown" && (
                    <div>
                      <Label className="text-xs mb-1">{field.label}</Label>
                      <Select disabled>
                        <SelectTrigger className="text-xs h-8">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </Select>
                    </div>
                  )}
                  {field.type === "columns" && (
                    <div className="border border-border/50 rounded p-2 bg-muted/20">
                      <div 
                        className={`grid gap-2 ${
                          field.columnCount === 1 ? "grid-cols-1" :
                          field.columnCount === 2 ? 
                            field.columnVariant === "left-large" ? "grid-cols-[2fr_1fr]" :
                            field.columnVariant === "right-large" ? "grid-cols-[1fr_2fr]" :
                            "grid-cols-2" :
                          field.columnCount === 3 ? "grid-cols-3" :
                          "grid-cols-4"
                        }`}
                      >
                        {Array.from({ length: field.columnCount || 2 }).map((_, colIndex) => (
                          <div key={colIndex} className="border border-dashed border-border rounded p-2 min-h-[60px] bg-background/50">
                            {field.fields && field.fields.filter((_, i) => i % (field.columnCount || 2) === colIndex).map((nestedField) => (
                              <div key={nestedField.id} className="mb-2 last:mb-0">
                                {nestedField.type === "text" && (
                                  <div>
                                    <Label className="text-xs mb-1 block">{nestedField.label}</Label>
                                    <Input placeholder={nestedField.placeholder} className="text-xs h-6" disabled />
                                  </div>
                                )}
                                {nestedField.type === "textarea" && (
                                  <div>
                                    <Label className="text-xs mb-1 block">{nestedField.label}</Label>
                                    <Textarea placeholder={nestedField.placeholder} className="text-xs min-h-[40px]" disabled />
                                  </div>
                                )}
                                {nestedField.type === "url" && (
                                  <div>
                                    <Label className="text-xs mb-1 block">{nestedField.label}</Label>
                                    <Input type="url" placeholder={nestedField.placeholder} className="text-xs h-6" disabled />
                                  </div>
                                )}
                                {nestedField.type === "checkbox" && (
                                  <div className="flex items-center gap-1">
                                    <input type="checkbox" disabled className="w-3 h-3" />
                                    <span className="text-xs">{nestedField.label}</span>
                                  </div>
                                )}
                                {nestedField.type === "radio" && (
                                  <div className="space-y-1">
                                    <Label className="text-xs mb-1 block">{nestedField.label}</Label>
                                    {nestedField.options?.map((opt, i) => (
                                      <div key={i} className="flex items-center gap-1">
                                        <input type="radio" name={nestedField.id} disabled className="w-3 h-3" />
                                        <span className="text-xs">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {nestedField.type === "dropdown" && (
                                  <div>
                                    <Label className="text-xs mb-1 block">{nestedField.label}</Label>
                                    <Select disabled>
                                      <SelectTrigger className="text-xs h-6">
                                        <SelectValue placeholder="Select option" />
                                      </SelectTrigger>
                                    </Select>
                                  </div>
                                )}
                                {nestedField.type === "button" && (
                                  <Button variant="outline" size="sm" className="w-full text-xs h-6" disabled>
                                    {nestedField.label}
                                  </Button>
                                )}
                                {nestedField.type === "image" && (
                                  <div>
                                    <Label className="text-xs mb-1 block">{nestedField.label}</Label>
                                    {nestedField.fileUrl ? (
                                      <div className="relative w-full h-16 rounded border border-border overflow-hidden">
                                        <img src={nestedField.fileUrl} alt="Preview" className="w-full h-full object-cover" />
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-center h-16 border border-dashed border-border rounded bg-muted/30">
                                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                )}
                                {nestedField.type === "video" && (
                                  <div>
                                    <Label className="text-xs mb-1 block">{nestedField.label}</Label>
                                    {nestedField.fileUrl ? (
                                      <div className="relative w-full h-20 rounded border border-border overflow-hidden bg-black">
                                        <video src={nestedField.fileUrl} className="w-full h-full object-cover" controls />
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-center h-20 border border-dashed border-border rounded bg-muted/30">
                                        <Video className="w-4 h-4 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                            {(!field.fields || field.fields.filter((_, i) => i % (field.columnCount || 2) === colIndex).length === 0) && (
                              <div className="flex items-center justify-center h-full">
                                <span className="text-xs text-muted-foreground">Column {colIndex + 1}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {field.type === "heading" && (
                    <div
                      className={`text-left relative group ${isActive ? "cursor-text hover:ring-2 hover:ring-[#1DBFAA]/50 rounded px-2 py-1 transition-all" : ""} ${
                        editingFieldId === field.id && isActive ? "ring-2 ring-[#1DBFAA]" : ""
                      }`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove heading"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            title="Reorder"
                          >
                            <GripVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {editingFieldId === field.id && isActive ? (
                        <Input
                          value={field.content || ""}
                          onChange={(e) => updateFormField(field.id, { content: e.target.value })}
                          onBlur={() => setEditingFieldId(null)}
                          autoFocus
                          className="text-base font-bold"
                          style={{ color: config.textColor }}
                          placeholder="Enter heading text"
                        />
                      ) : (
                        <h3 className="text-base font-bold" style={{ color: config.textColor }}>
                          {field.content || "Heading Text"}
                        </h3>
                      )}
                    </div>
                  )}
                  {field.type === "textblock" && (
                    <div
                      className={`text-left relative group ${isActive ? "cursor-text hover:ring-2 hover:ring-[#1DBFAA]/50 rounded px-2 py-1 transition-all" : ""} ${
                        editingFieldId === field.id && isActive ? "ring-2 ring-[#1DBFAA]" : ""
                      }`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove text"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            title="Reorder"
                          >
                            <GripVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {editingFieldId === field.id && isActive ? (
                        <Textarea
                          value={field.content || ""}
                          onChange={(e) => updateFormField(field.id, { content: e.target.value })}
                          onBlur={() => setEditingFieldId(null)}
                          autoFocus
                          className="text-xs min-h-[60px]"
                          style={{ color: config.textColor }}
                          placeholder="Enter text content"
                        />
                      ) : (
                        <p className="text-xs" style={{ color: config.textColor, opacity: 0.9 }}>
                          {field.content || "Text content goes here..."}
                        </p>
                      )}
                    </div>
                  )}
                  {field.type === "link" && (
                    <div
                      className={`text-left relative group ${isActive ? "cursor-text hover:ring-2 hover:ring-[#1DBFAA]/50 rounded px-2 py-1 transition-all" : ""} ${
                        editingFieldId === field.id && isActive ? "ring-2 ring-[#1DBFAA]" : ""
                      }`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove link"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            title="Reorder"
                          >
                            <GripVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {editingFieldId === field.id && isActive ? (
                        <div className="space-y-1">
                          <Input
                            value={field.content || ""}
                            onChange={(e) => updateFormField(field.id, { content: e.target.value })}
                            className="text-xs h-7"
                            placeholder="Link text"
                          />
                          <Input
                            value={field.href || ""}
                            onChange={(e) => updateFormField(field.id, { href: e.target.value })}
                            onBlur={() => setEditingFieldId(null)}
                            className="text-xs h-7"
                            placeholder="https://example.com"
                          />
                        </div>
                      ) : (
                        <a href={field.href || "#"} className="text-xs underline" style={{ color: config.buttonColor }}>
                          {field.content || "Link text"}
                        </a>
                      )}
                    </div>
                  )}
                  {field.type === "linkbox" && (
                    <div
                      className={`relative group ${isActive ? "cursor-text hover:ring-2 hover:ring-[#1DBFAA]/50 rounded transition-all" : ""} ${
                        editingFieldId === field.id && isActive ? "ring-2 ring-[#1DBFAA]" : ""
                      }`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove link box"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            title="Reorder"
                          >
                            <GripVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {editingFieldId === field.id && isActive ? (
                        <div className="border border-border rounded p-2 bg-muted/20 space-y-1">
                          <Input
                            value={field.content || ""}
                            onChange={(e) => updateFormField(field.id, { content: e.target.value })}
                            className="text-xs h-7"
                            placeholder="Link box text"
                          />
                          <Input
                            value={field.href || ""}
                            onChange={(e) => updateFormField(field.id, { href: e.target.value })}
                            onBlur={() => setEditingFieldId(null)}
                            className="text-xs h-7"
                            placeholder="https://example.com"
                          />
                        </div>
                      ) : (
                        <div className="border border-border rounded p-2 bg-muted/20 text-center">
                          <a href={field.href || "#"} className="text-xs font-medium" style={{ color: config.buttonColor }}>
                            {field.content || "Link Box"}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  {field.type === "imagebox" && (
                    <div
                      className={`relative group ${isActive ? "cursor-pointer hover:ring-2 hover:ring-[#1DBFAA]/50 rounded transition-all" : ""} ${
                        editingFieldId === field.id && isActive ? "ring-2 ring-[#1DBFAA]" : ""
                      }`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove image box"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            title="Reorder"
                          >
                            <GripVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {editingFieldId === field.id && isActive ? (
                        <div className="space-y-1">
                          <Label className="text-xs">Image URL</Label>
                          <Input
                            value={field.fileUrl || ""}
                            onChange={(e) => updateFormField(field.id, { fileUrl: e.target.value })}
                            onBlur={() => setEditingFieldId(null)}
                            className="text-xs h-7"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      ) : (
                        <>
                          {field.fileUrl ? (
                            <div className="relative w-full h-32 rounded-lg border-2 border-border overflow-hidden shadow-sm">
                              <img src={field.fileUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg bg-muted/30">
                              <ImageIcon className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {field.type === "map" && (
                    <div
                      className={`relative group ${isActive ? "cursor-pointer hover:ring-2 hover:ring-[#1DBFAA]/50 rounded transition-all" : ""} ${
                        editingFieldId === field.id && isActive ? "ring-2 ring-[#1DBFAA]" : ""
                      }`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove map"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            title="Reorder"
                          >
                            <GripVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {editingFieldId === field.id && isActive ? (
                        <div className="space-y-1">
                          <Label className="text-xs">Map Embed URL</Label>
                          <Input
                            value={field.mapUrl || ""}
                            onChange={(e) => updateFormField(field.id, { mapUrl: e.target.value })}
                            onBlur={() => setEditingFieldId(null)}
                            className="text-xs h-7"
                            placeholder="https://maps.google.com/..."
                          />
                          <p className="text-xs text-muted-foreground">Paste Google Maps embed URL</p>
                        </div>
                      ) : (
                        <>
                          {field.mapUrl ? (
                            <iframe
                              src={field.mapUrl}
                              className="w-full h-32 rounded border border-border"
                              allowFullScreen
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-32 border border-dashed border-border rounded bg-muted/30">
                              <Layout className="w-6 h-6 text-muted-foreground" />
                              <span className="ml-2 text-xs text-muted-foreground">Map Embed</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {field.type === "icon" && (
                    <div
                      className={`relative group ${isActive ? "cursor-pointer" : ""}`}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setEditingFieldId(field.id);
                        }
                      }}
                    >
                      {isActive && editingFieldId === field.id && (
                        <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFormField(field.id);
                            }}
                            title="Remove icon"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </Button>
                        </div>
                      )}
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Button */}
          <div
            className={`relative ${isActive ? "cursor-text hover:ring-2 hover:ring-[#1DBFAA]/50 rounded transition-all" : ""} ${
              editingElement === "button" && isActive ? "ring-2 ring-[#1DBFAA]" : ""
            }`}
            onClick={(e) => {
              if (isActive) {
                e.stopPropagation();
                setEditingElement("button");
              }
            }}
          >
            {isActive && editingElement === "button" && (
              <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isFollowUp && activeFollowUpId) {
                      updateActiveFollowUp({ buttonText: "" });
                    } else {
                      updateActiveStep({ buttonText: "" });
                    }
                    setEditingElement(null);
                  }}
                  title="Remove button text"
                >
                  <X className="w-3 h-3 text-destructive" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                  title="Reorder"
                >
                  <GripVertical className="w-3 h-3" />
                </Button>
              </div>
            )}

            {editingElement === "button" && isActive ? (
              <Input
                value={config.buttonText}
                onChange={(e) => {
                  if (isFollowUp && activeFollowUpId) {
                    updateActiveFollowUp({ buttonText: e.target.value });
                  } else {
                    updateActiveStep({ buttonText: e.target.value });
                  }
                }}
                onSelect={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onClick={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onKeyUp={(e) => {
                  setCursorPosition(e.target.selectionStart);
                }}
                onBlur={() => setEditingElement(null)}
                autoFocus
                className="w-full text-xs text-center"
              />
            ) : (
              <Button
                size="sm"
                className="w-full text-xs pointer-events-none"
                style={{
                  backgroundColor: config.buttonColor,
                  borderRadius: `${config.borderRadius}px`,
                  fontSize: `${popupFlow.typography.buttonSize}px`,
                  fontWeight: popupFlow.typography.buttonWeight
                }}
              >
                {config.buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
          <div className="container mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Input
                value={popupFlow.name}
                onChange={(e) => setPopupFlow({ ...popupFlow, name: e.target.value })}
                className="text-sm font-semibold bg-background border-0 h-8 w-[300px]" />

              <Badge variant="secondary" className="text-xs">Initial Design</Badge>
              
              {/* DEBUG BADGE */}
              {activeFollowUpId && (
                <Badge variant="default" className="text-xs bg-[#1DBFAA]">
                  Follow-up Active: {activeFollowUpId}
                </Badge>
              )}
              
              {/* Popup Type Selector */}
              <div className="flex items-center gap-2 ml-4 border-l border-border pl-4">
                <Label className="text-xs text-muted-foreground">Type:</Label>
                <Select value={popupType} onValueChange={setPopupType}>
                  <SelectTrigger className="h-8 w-[220px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POPUP_TYPES.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span className="text-xs">{type.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleUndo}
                disabled={historyIndex <= 0}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}>
                <Redo className="w-4 h-4" />
              </Button>
              <div className="mx-2 h-6 w-px bg-border" />
              <span className="text-sm text-muted-foreground">Draft saved</span>
              <div className="mx-2 h-6 w-px bg-border" />
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "desktop" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setViewMode("desktop")}>
                  <Monitor className="w-3 h-3" />
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setViewMode("mobile")}>
                  <Smartphone className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="flex items-center gap-1 border border-border rounded-lg px-2 py-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}>
                  <ZoomOut className="w-3 h-3" />
                </Button>
                <span className="text-xs font-medium min-w-[3rem] text-center">{zoomLevel}%</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}>
                  <ZoomIn className="w-3 h-3" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => setTemplateDialogOpen(true)}>
                <LayoutTemplate className="w-3 h-3 mr-1" />
                Template
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => setPreviewOpen(true)}>
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={handleSave}
                disabled={saving}>
                {saving ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Save className="w-3 h-3 mr-1" />}
                Save Draft
              </Button>
              <Button
                size="sm"
                className="bg-[#1DBFAA] hover:bg-[#1DBFAA]/90 h-8 text-xs"
                onClick={handleSave}>
                Save and review
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-6">
          {/* Popup Type Info Banner */}
          <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border/50">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{currentPopupConfig.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{currentPopupConfig.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {viewMode === "desktop" ? "🖥️ Desktop" : "📱 Mobile"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{currentPopupConfig.description}</p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <code className="bg-background px-2 py-0.5 rounded">
                      {getDimensions().width} × {getDimensions().height}
                    </code>
                  </div>
                  {currentPopupConfig.backdrop && (
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Backdrop:</span>
                      <code className="bg-background px-2 py-0.5 rounded">
                        {(currentPopupConfig.backdropOpacity * 100).toFixed(0)}%
                      </code>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Border Radius:</span>
                    <code className="bg-background px-2 py-0.5 rounded">
                      {currentPopupConfig.borderRadius}px
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
            {/* Left Sidebar - Steps Journey */}
            <div className="space-y-4 sticky top-6 self-start max-h-[calc(100vh-180px)] overflow-y-auto">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-base">Steps</h3>
                  <Badge variant="outline" className="text-xs">{popupFlow.steps.length} {popupFlow.steps.length === 1 ? 'Step' : 'Steps'}</Badge>
                </div>
                
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {popupFlow.steps.map((step, index) =>
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-2">

                        {/* Main Step */}
                        <button
                        onClick={() => {
                          setActiveStepId(step.id);
                          setActiveFollowUpId(null);
                          setEditingElement(null);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between group border ${
                        activeStepId === step.id && !activeFollowUpId ?
                        "bg-background border-border shadow-sm" :
                        "bg-muted/30 border-transparent hover:border-border/50"}`
                        }>

                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-sm font-semibold text-muted-foreground bg-background w-6 h-6 rounded flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <div className="text-sm font-semibold">{step.name}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 w-7 p-0 hover:bg-[#1DBFAA]/10 transition-opacity ${
                            activeStepId === step.id && !activeFollowUpId ?
                            "opacity-100" :
                            "opacity-0 group-hover:opacity-100"}`
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateStep(step.id);
                            }}
                            title="Duplicate step">

                              <Copy className="w-3.5 h-3.5 text-[#1DBFAA]" />
                            </Button>
                            {popupFlow.steps.length > 1 &&
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 w-7 p-0 hover:bg-destructive/10 transition-opacity ${
                            activeStepId === step.id && !activeFollowUpId ?
                            "opacity-100" :
                            "opacity-0 group-hover:opacity-100"}`
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteStep(step.id);
                            }}>

                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </Button>
                          }
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </button>

                        {/* Follow-up Steps */}
                        {step.followUps && step.followUps.length > 0 &&
                      <div className="ml-6 pl-4 border-l-2 border-border/50 space-y-2">
                            {step.followUps.map((followUp) =>
                        <button
                          key={followUp.id}
                          onClick={() => {
                            setActiveStepId(step.id);
                            setActiveFollowUpId(followUp.id);
                            setEditingElement(null);
                          }}
                          className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between group border ${
                          activeFollowUpId === followUp.id ?
                          "bg-background border-border shadow-sm" :
                          "bg-muted/20 border-transparent hover:border-border/50"}`
                          }>

                                <div className="flex items-center gap-2 flex-1">
                                  <span className="text-xs text-muted-foreground">Follow-up /</span>
                                  <span className="text-xs font-medium">{followUp.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 hover:bg-[#1DBFAA]/10 transition-opacity ${
                              activeFollowUpId === followUp.id ?
                              "opacity-100" :
                              "opacity-0 group-hover:opacity-100"}`
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                setSettingsFollowUpId(followUp.id);
                                setSettingsDialogOpen(true);
                              }}
                              title="Configure settings">

                                    <Settings className="w-3 h-3 text-[#1DBFAA]" />
                                  </Button>
                                  <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 hover:bg-[#1DBFAA]/10 transition-opacity ${
                              activeFollowUpId === followUp.id ?
                              "opacity-100" :
                              "opacity-0 group-hover:opacity-100"}`
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateFollowUp(step.id, followUp.id);
                              }}
                              title="Duplicate follow-up">

                                    <Copy className="w-3 h-3 text-[#1DBFAA]" />
                                  </Button>
                                  <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 hover:bg-destructive/10 transition-opacity ${
                              activeFollowUpId === followUp.id ?
                              "opacity-100" :
                              "opacity-0 group-hover:opacity-100"}`
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteFollowUp(step.id, followUp.id);
                              }}>

                                    <Trash2 className="w-3 h-3 text-destructive" />
                                  </Button>
                                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                                </div>
                              </button>
                        )}
                            <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-8 text-xs text-muted-foreground hover:text-foreground"
                          onClick={() => addFollowUpStep(step.id)}>

                              <Plus className="w-3 h-3 mr-1" />
                              Add follow-up
                            </Button>
                          </div>
                      }

                        {!step.followUps || step.followUps.length === 0 ?
                      <div className="ml-6 pl-4 border-l-2 border-border/50">
                            <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-8 text-xs text-muted-foreground hover:text-foreground"
                          onClick={() => addFollowUpStep(step.id)}>

                              <Plus className="w-3 h-3 mr-1" />
                              Add follow-up
                            </Button>
                          </div> :
                      null}

                        {/* Connection line to next step */}
                        {index < popupFlow.steps.length - 1 &&
                      <div className="flex items-center justify-center h-4">
                            <div className="w-px h-full bg-border/50" />
                          </div>
                      }
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 text-[#1DBFAA] border-[#1DBFAA]/30 hover:bg-[#1DBFAA]/10"
                  onClick={addStep}>

                  <Plus className="w-4 h-4 mr-2" />
                  Add a step
                </Button>
              </Card>
            </div>

            {/* Center - Canvas */}
            <div className="flex flex-col">
              <Card className="flex-1 p-6 bg-muted/20 min-h-[600px]">
                
                <div 
                  className="h-full flex items-center justify-center py-8 px-4"
                  style={{
                    backgroundColor: currentPopupConfig.backdrop 
                      ? `rgba(0, 0, 0, ${currentPopupConfig.backdropOpacity})` 
                      : 'transparent',
                    overflow: activeFollowUpId ? 'auto' : 'visible'
                  }}
                >
                  <div 
                    className="transition-all duration-300 mx-auto"
                    style={{
                      width: getDimensions().width,
                      height: getDimensions().height,
                      maxWidth: getDimensions().maxWidth,
                      maxHeight: getDimensions().maxHeight,
                      zoom: `${zoomLevel}%`
                    }}
                  >
                    {activeStep && (
                      <motion.div
                        key={activeStep.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full"
                      >
                        <div className="flex items-start gap-8 h-full">
                          {/* Main Step Preview */}
                          <div
                            onClick={() => {
                              setActiveStepId(activeStep.id);
                              setActiveFollowUpId(null);
                            }}
                            style={{ 
                              width: getDimensions().singleWidth,
                              flexShrink: 0
                            }}
                            className={`cursor-pointer transition-all relative group h-full ${
                              !activeFollowUpId ?
                              "ring-2 ring-[#1DBFAA] ring-offset-2" :
                              "hover:ring-2 hover:ring-border hover:ring-offset-2"
                            }`}
                          >
                            <div className={`absolute -top-3 -right-3 flex gap-1 z-20 transition-opacity ${
                              !activeFollowUpId ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0 rounded-full shadow-lg bg-background border-[#1DBFAA] hover:bg-[#1DBFAA]/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateStep(activeStep.id);
                                }}
                                title="Duplicate step"
                              >
                                <Copy className="w-3.5 h-3.5 text-[#1DBFAA]" />
                              </Button>
                              {popupFlow.steps.length > 1 && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-7 w-7 p-0 rounded-full shadow-lg"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteStep(activeStep.id);
                                  }}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              )}
                            </div>
                            {renderStepPreview(activeStep, !activeFollowUpId, false)}
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                              {popupFlow.steps.findIndex(s => s.id === activeStep.id) + 1}
                            </div>
                          </div>
                          
                          {/* Follow-up Preview */}
                          {activeFollowUpId && activeFollowUp && (
                            <div
                              onClick={() => {
                                setActiveStepId(activeStep.id);
                                setActiveFollowUpId(activeFollowUp.id);
                              }}
                              style={{ 
                                width: getDimensions().singleWidth,
                                flexShrink: 0
                              }}
                              className="cursor-pointer transition-all relative group h-full ring-2 ring-[#1DBFAA] ring-offset-2"
                            >
                              <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 w-7 p-0 rounded-full shadow-lg bg-background border-[#1DBFAA] hover:bg-[#1DBFAA]/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSettingsFollowUpId(activeFollowUp.id);
                                    setSettingsDialogOpen(true);
                                  }}
                                  title="Configure settings"
                                >
                                  <Settings className="w-3.5 h-3.5 text-[#1DBFAA]" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 w-7 p-0 rounded-full shadow-lg bg-background border-[#1DBFAA] hover:bg-[#1DBFAA]/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    duplicateFollowUp(activeStep.id, activeFollowUp.id);
                                  }}
                                  title="Duplicate follow-up"
                                >
                                  <Copy className="w-3.5 h-3.5 text-[#1DBFAA]" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-7 w-7 p-0 rounded-full shadow-lg"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFollowUp(activeStep.id, activeFollowUp.id);
                                  }}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                              
                              {renderStepPreview(activeFollowUp, true, true)}
                              
                              <div className="absolute -top-3 -left-3 px-3 h-8 bg-[#1DBFAA] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                                Follow-up
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4 sticky top-6 self-start max-h-[calc(100vh-180px)] overflow-y-auto">
              {/* Active Step Customization - Shows only when step is tapped/selected */}
              {(activeStep || activeFollowUp) &&
              <Card className="p-4">
                  <h3 className="font-semibold text-sm mb-3">
                    Customize {activeFollowUpId ? "Follow-up" : "Step"}
                  </h3>
                  
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-8">
                      <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
                      <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
                      <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-3 mt-3">
                      <div>
                        <Label className="text-xs mb-1">Headline</Label>
                        <Input
                        value={activeFollowUp?.headline || activeStep?.headline || ""}
                        onChange={(e) => {
                          if (activeFollowUpId) {
                            updateActiveFollowUp({ headline: e.target.value });
                          } else {
                            updateActiveStep({ headline: e.target.value });
                          }
                        }}
                        className="text-xs h-8" />

                      </div>

                      <div>
                        <Label className="text-xs mb-1">Subheadline</Label>
                        <Input
                        value={activeFollowUp?.subheadline || activeStep?.subheadline || ""}
                        onChange={(e) => {
                          if (activeFollowUpId) {
                            updateActiveFollowUp({ subheadline: e.target.value });
                          } else {
                            updateActiveStep({ subheadline: e.target.value });
                          }
                        }}
                        className="text-xs h-8" />

                      </div>

                      <div>
                        <Label className="text-xs mb-1">Button Text</Label>
                        <Input
                        value={activeFollowUp?.buttonText || activeStep?.buttonText || ""}
                        onChange={(e) => {
                          if (activeFollowUpId) {
                            updateActiveFollowUp({ buttonText: e.target.value });
                          } else {
                            updateActiveStep({ buttonText: e.target.value });
                          }
                        }}
                        className="text-xs h-8" />

                      </div>

                      <div>
                        <Label className="text-xs mb-1">Button URL</Label>
                        <Input
                        value={activeFollowUp?.buttonUrl || activeStep?.buttonUrl || ""}
                        onChange={(e) => {
                          if (activeFollowUpId) {
                            updateActiveFollowUp({ buttonUrl: e.target.value });
                          } else {
                            updateActiveStep({ buttonUrl: e.target.value });
                          }
                        }}
                        placeholder="https://example.com"
                        className="text-xs h-8" />
                        <p className="text-xs text-muted-foreground mt-1">URL to redirect when button is clicked</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Show Icon</Label>
                        <Switch
                        checked={activeFollowUp?.showImage || activeStep?.showImage || false}
                        onCheckedChange={(checked) => {
                          if (activeFollowUpId) {
                            updateActiveFollowUp({ showImage: checked });
                          } else {
                            updateActiveStep({ showImage: checked });
                          }
                        }} />

                      </div>
                    </TabsContent>

                    <TabsContent value="design" className="space-y-3 mt-3">
                      {/* Multiple Typography Section */}
                      <div className="pb-3 border-b border-border">
                        <Label className="text-xs font-semibold mb-3 block">Typography</Label>
                        
                        {/* Heading Typography */}
                        <div className="space-y-2 mb-3 pb-3 border-b border-border/50">
                          <Label className="text-xs text-muted-foreground">Headline</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs mb-1">Font Size</Label>
                              <Input
                              type="number"
                              value={popupFlow.typography.headingSize}
                              onChange={(e) => setPopupFlow({
                                ...popupFlow,
                                typography: { ...popupFlow.typography, headingSize: parseInt(e.target.value) || 24 }
                              })}
                              className="text-xs h-7"
                              min={12}
                              max={48} />

                            </div>
                            <div>
                              <Label className="text-xs mb-1">Weight</Label>
                              <Select
                              value={popupFlow.typography.headingWeight.toString()}
                              onValueChange={(value) => setPopupFlow({
                                ...popupFlow,
                                typography: { ...popupFlow.typography, headingWeight: parseInt(value) }
                              })}>

                                <SelectTrigger className="text-xs h-7">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="300">Light (300)</SelectItem>
                                  <SelectItem value="400">Regular (400)</SelectItem>
                                  <SelectItem value="500">Medium (500)</SelectItem>
                                  <SelectItem value="600">Semibold (600)</SelectItem>
                                  <SelectItem value="700">Bold (700)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Subheading Typography */}
                        <div className="space-y-2 mb-3 pb-3 border-b border-border/50">
                          <Label className="text-xs text-muted-foreground">Subheadline</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs mb-1">Font Size</Label>
                              <Input
                              type="number"
                              value={popupFlow.typography.subheadingSize}
                              onChange={(e) => setPopupFlow({
                                ...popupFlow,
                                typography: { ...popupFlow.typography, subheadingSize: parseInt(e.target.value) || 14 }
                              })}
                              className="text-xs h-7"
                              min={10}
                              max={24} />

                            </div>
                            <div>
                              <Label className="text-xs mb-1">Weight</Label>
                              <Select
                              value={popupFlow.typography.subheadingWeight.toString()}
                              onValueChange={(value) => setPopupFlow({
                                ...popupFlow,
                                typography: { ...popupFlow.typography, subheadingWeight: parseInt(value) }
                              })}>

                                <SelectTrigger className="text-xs h-7">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="300">Light (300)</SelectItem>
                                  <SelectItem value="400">Regular (400)</SelectItem>
                                  <SelectItem value="500">Medium (500)</SelectItem>
                                  <SelectItem value="600">Semibold (600)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Button Typography */}
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Button</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs mb-1">Font Size</Label>
                              <Input
                              type="number"
                              value={popupFlow.typography.buttonSize}
                              onChange={(e) => setPopupFlow({
                                ...popupFlow,
                                typography: { ...popupFlow.typography, buttonSize: parseInt(e.target.value) || 14 }
                              })}
                              className="text-xs h-7"
                              min={10}
                              max={20} />

                            </div>
                            <div>
                              <Label className="text-xs mb-1">Weight</Label>
                              <Select
                              value={popupFlow.typography.buttonWeight.toString()}
                              onValueChange={(value) => setPopupFlow({
                                ...popupFlow,
                                typography: { ...popupFlow.typography, buttonWeight: parseInt(value) }
                              })}>

                                <SelectTrigger className="text-xs h-7">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="400">Regular (400)</SelectItem>
                                  <SelectItem value="500">Medium (500)</SelectItem>
                                  <SelectItem value="600">Semibold (600)</SelectItem>
                                  <SelectItem value="700">Bold (700)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Background Image */}
                      <div className="pb-3 border-b border-border">
                        <Label className="text-xs font-semibold mb-2 block">Background</Label>
                        <div>
                          <Label className="text-xs mb-1">Background Image URL</Label>
                          <Input
                          value={activeFollowUp?.backgroundImage || activeStep?.backgroundImage || ""}
                          onChange={(e) => {
                            if (activeFollowUpId) {
                              updateActiveFollowUp({ backgroundImage: e.target.value });
                            } else {
                              updateActiveStep({ backgroundImage: e.target.value });
                            }
                          }}
                          placeholder="https://example.com/image.jpg"
                          className="text-xs h-8" />

                          <p className="text-xs text-muted-foreground mt-1">Leave empty for solid color</p>
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="pb-3 border-b border-border">
                        <Label className="text-xs font-semibold mb-2 block">Colors</Label>
                        <div>
                          <Label className="text-xs mb-1">Background</Label>
                          <div className="flex gap-2">
                            <Input
                            type="color"
                            value={activeFollowUp?.backgroundColor || activeStep?.backgroundColor || "#FFFFFF"}
                            onChange={(e) => {
                              if (activeFollowUpId) {
                                updateActiveFollowUp({ backgroundColor: e.target.value });
                              } else {
                                updateActiveStep({ backgroundColor: e.target.value });
                              }
                            }}
                            className="w-12 h-8 p-1 cursor-pointer" />

                            <Input
                            value={activeFollowUp?.backgroundColor || activeStep?.backgroundColor || "#FFFFFF"}
                            onChange={(e) => {
                              if (activeFollowUpId) {
                                updateActiveFollowUp({ backgroundColor: e.target.value });
                              } else {
                                updateActiveStep({ backgroundColor: e.target.value });
                              }
                            }}
                            className="flex-1 text-xs h-8" />

                          </div>
                        </div>

                        <div className="mt-3">
                          <Label className="text-xs mb-1">Text Color</Label>
                          <div className="flex gap-2">
                            <Input
                            type="color"
                            value={activeFollowUp?.textColor || activeStep?.textColor || "#493D34"}
                            onChange={(e) => {
                              if (activeFollowUpId) {
                                updateActiveFollowUp({ textColor: e.target.value });
                              } else {
                                updateActiveStep({ textColor: e.target.value });
                              }
                            }}
                            className="w-12 h-8 p-1 cursor-pointer" />

                            <Input
                            value={activeFollowUp?.textColor || activeStep?.textColor || "#493D34"}
                            onChange={(e) => {
                              if (activeFollowUpId) {
                                updateActiveFollowUp({ textColor: e.target.value });
                              } else {
                                updateActiveStep({ textColor: e.target.value });
                              }
                            }}
                            className="flex-1 text-xs h-8" />

                          </div>
                        </div>

                        <div className="mt-3">
                          <Label className="text-xs mb-1">Button Color</Label>
                          <div className="flex gap-2">
                            <Input
                            type="color"
                            value={activeFollowUp?.buttonColor || activeStep?.buttonColor || "#EC5B31"}
                            onChange={(e) => {
                              if (activeFollowUpId) {
                                updateActiveFollowUp({ buttonColor: e.target.value });
                              } else {
                                updateActiveStep({ buttonColor: e.target.value });
                              }
                            }}
                            className="w-12 h-8 p-1 cursor-pointer" />

                            <Input
                            value={activeFollowUp?.buttonColor || activeStep?.buttonColor || "#EC5B31"}
                            onChange={(e) => {
                              if (activeFollowUpId) {
                                updateActiveFollowUp({ buttonColor: e.target.value });
                              } else {
                                updateActiveStep({ buttonColor: e.target.value });
                              }
                            }}
                            className="flex-1 text-xs h-8" />

                          </div>
                        </div>
                      </div>

                      {/* Border Radius */}
                      <div>
                        <Label className="text-xs mb-2">
                          Border Radius: {activeFollowUp?.borderRadius || activeStep?.borderRadius || 12}px
                        </Label>
                        <Slider
                        value={[activeFollowUp?.borderRadius || activeStep?.borderRadius || 12]}
                        onValueChange={(value) => {
                          if (activeFollowUpId) {
                            updateActiveFollowUp({ borderRadius: value[0] });
                          } else {
                            updateActiveStep({ borderRadius: value[0] });
                          }
                        }}
                        min={0}
                        max={32}
                        step={1}
                        className="mt-2" />

                      </div>
                    </TabsContent>

                    <TabsContent value="layout" className="space-y-3 mt-3">
                      {/* Conditional Logic Section - Only show for follow-ups */}
                      {activeFollowUpId && activeFollowUp && (
                        <div className="pb-4 mb-4 border-b border-border">
                          <Label className="text-xs font-semibold mb-2 block">⚡ Conditional Logic</Label>
                          <p className="text-xs text-muted-foreground mb-3">
                            Set when this follow-up should appear
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs mb-1">Trigger Type</Label>
                              <Select
                                value={activeFollowUp.condition?.type || "button_click"}
                                onValueChange={(value) => {
                                  updateActiveFollowUp({
                                    condition: {
                                      ...activeFollowUp.condition,
                                      type: value,
                                      targetElement: "",
                                      targetType: value === "button_click" ? "button" : 
                                                  value === "form_submit" ? "form_field" :
                                                  value === "checkbox_check" ? "checkbox" : "button"
                                    }
                                  });
                                }}>
                                <SelectTrigger className="text-xs h-8">
                                  <SelectValue placeholder="Select trigger" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="button_click">Button Click</SelectItem>
                                  <SelectItem value="form_submit">Form Submit</SelectItem>
                                  <SelectItem value="field_interaction">Field Interaction</SelectItem>
                                  <SelectItem value="checkbox_check">Checkbox Check</SelectItem>
                                  <SelectItem value="element_click">Element Click</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Target Element Type */}
                            {activeFollowUp.condition?.type && (
                              <div>
                                <Label className="text-xs mb-1">Target Element Type</Label>
                                <Select
                                  value={activeFollowUp.condition?.targetType || "button"}
                                  onValueChange={(value) => {
                                    updateActiveFollowUp({
                                      condition: {
                                        ...activeFollowUp.condition,
                                        targetType: value
                                      }
                                    });
                                  }}>
                                  <SelectTrigger className="text-xs h-8">
                                    <SelectValue placeholder="Select element" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="button">Button</SelectItem>
                                    <SelectItem value="headline">Headline</SelectItem>
                                    <SelectItem value="subheadline">Subheadline</SelectItem>
                                    <SelectItem value="form_field">Form Field</SelectItem>
                                    <SelectItem value="checkbox">Checkbox</SelectItem>
                                    <SelectItem value="radio">Radio Button</SelectItem>
                                    <SelectItem value="dropdown">Dropdown</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {/* Target Element Selector */}
                            {activeFollowUp.condition?.type && (
                              <div>
                                <Label className="text-xs mb-1">Element Identifier</Label>
                                <Input
                                  value={activeFollowUp.condition?.targetElement || ""}
                                  onChange={(e) => {
                                    updateActiveFollowUp({
                                      condition: {
                                        ...activeFollowUp.condition,
                                        targetElement: e.target.value
                                      }
                                    });
                                  }}
                                  placeholder="e.g., claim-offer-button, email-field"
                                  className="text-xs h-8" />
                                <p className="text-xs text-muted-foreground mt-1">
                                  {activeFollowUp.condition?.targetType === "button" && "Enter button text or ID"}
                                  {activeFollowUp.condition?.targetType === "form_field" && "Enter field label or ID"}
                                  {activeFollowUp.condition?.targetType === "headline" && "Clicking on headline text"}
                                  {activeFollowUp.condition?.targetType === "subheadline" && "Clicking on subheadline text"}
                                  {(activeFollowUp.condition?.targetType === "checkbox" || 
                                    activeFollowUp.condition?.targetType === "radio" ||
                                    activeFollowUp.condition?.targetType === "dropdown") && 
                                    "Enter field label or ID"}
                                </p>
                              </div>
                            )}

                            {/* Visual Preview of Condition */}
                            {activeFollowUp.condition?.type && (
                              <div className="bg-muted/50 rounded-lg p-3 mt-3">
                                <div className="flex items-start gap-2">
                                  <Sparkles className="w-4 h-4 text-[#1DBFAA] mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <p className="text-xs font-medium mb-1">Condition Summary:</p>
                                    <p className="text-xs text-muted-foreground">
                                      {activeFollowUp.condition.type === "button_click" && 
                                        `Show this follow-up when user clicks on ${activeFollowUp.condition.targetElement || "the button"}`}
                                      {activeFollowUp.condition.type === "form_submit" && 
                                        `Show this follow-up when user submits ${activeFollowUp.condition.targetElement || "the form"}`}
                                      {activeFollowUp.condition.type === "field_interaction" && 
                                        `Show this follow-up when user interacts with ${activeFollowUp.condition.targetElement || "a field"}`}
                                      {activeFollowUp.condition.type === "checkbox_check" && 
                                        `Show this follow-up when user checks ${activeFollowUp.condition.targetElement || "a checkbox"}`}
                                      {activeFollowUp.condition.type === "element_click" && 
                                        `Show this follow-up when user clicks ${activeFollowUp.condition.targetElement || "an element"}`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Basic Elements Section */}
                      <div className="pb-4 mb-4 border-b border-border">
                        <Label className="text-xs font-semibold mb-2 block">📝 Basic</Label>
                        <p className="text-xs text-muted-foreground mb-3">Add basic content elements</p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("heading");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("heading")}>
                            <Type className="w-4 h-4" />
                            <span>Heading</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("textblock");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("textblock")}>
                            <Type className="w-4 h-4" />
                            <span>Text</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("textarea");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("textarea")}>
                            <AlignLeft className="w-4 h-4" />
                            <span>Text Area</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("link");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("link")}>
                            <LinkIcon className="w-4 h-4" />
                            <span>Link</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("linkbox");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("linkbox")}>
                            <Maximize2 className="w-4 h-4" />
                            <span>Link Box</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("image");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("image")}>
                            <ImageIcon className="w-4 h-4" />
                            <span>Image</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("imagebox");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("imagebox")}>
                            <ImageIcon className="w-4 h-4" />
                            <span>Image Box</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("video");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("video")}>
                            <Video className="w-4 h-4" />
                            <span>Video</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("map");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("map")}>
                            <Layout className="w-4 h-4" />
                            <span>Map</span>
                          </Button>
                          
                          <Button
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = "copy";
                              handleFieldDragStart("icon");
                            }}
                            onDragEnd={() => setDraggedFieldType(null)}
                            variant="outline"
                            size="sm"
                            className="h-12 text-xs flex-col justify-center gap-1 cursor-grab active:cursor-grabbing"
                            onClick={() => addFormField("icon")}>
                            <Sparkles className="w-4 h-4" />
                            <span>Icon</span>
                          </Button>
                        </div>
                      </div>
                      
                      {/* Column Layout Section */}
                      <div className="pb-4 mb-4 border-b border-border">
                        <Label className="text-xs font-semibold mb-2 block">📐 Column Layout</Label>
                        <p className="text-xs text-muted-foreground mb-3">Organize fields in columns</p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-16 text-xs flex-col justify-center gap-1"
                            onClick={() => addFormField("columns")}>
                            <div className="flex gap-1 items-center justify-center">
                              <div className="w-8 h-6 border-2 border-current rounded" />
                            </div>
                            <span>1 Column</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-16 text-xs flex-col justify-center gap-1"
                            onClick={() => {
                              const newField = {
                                id: `field-${Date.now()}`,
                                type: "columns",
                                label: "2 Columns",
                                columnCount: 2,
                                columnVariant: "equal",
                                fields: []
                              };
                              if (activeFollowUpId && activeFollowUp) {
                                updateActiveFollowUp({ formFields: [...(activeFollowUp.formFields || []), newField] });
                              } else if (activeStep) {
                                updateActiveStep({ formFields: [...(activeStep.formFields || []), newField] });
                              }
                              toast.success("Added 2 columns layout");
                            }}>
                            <div className="flex gap-1 items-center justify-center">
                              <div className="w-3.5 h-6 border-2 border-current rounded" />
                              <div className="w-3.5 h-6 border-2 border-current rounded" />
                            </div>
                            <span>2 Columns</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-16 text-xs flex-col justify-center gap-1"
                            onClick={() => {
                              const newField = {
                                id: `field-${Date.now()}`,
                                type: "columns",
                                label: "3 Columns",
                                columnCount: 3,
                                columnVariant: "equal",
                                fields: []
                              };
                              if (activeFollowUpId && activeFollowUp) {
                                updateActiveFollowUp({ formFields: [...(activeFollowUp.formFields || []), newField] });
                              } else if (activeStep) {
                                updateActiveStep({ formFields: [...(activeStep.formFields || []), newField] });
                              }
                              toast.success("Added 3 columns layout");
                            }}>
                            <div className="flex gap-1 items-center justify-center">
                              <div className="w-2.5 h-6 border-2 border-current rounded" />
                              <div className="w-2.5 h-6 border-2 border-current rounded" />
                              <div className="w-2.5 h-6 border-2 border-current rounded" />
                            </div>
                            <span>3 Columns</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-16 text-xs flex-col justify-center gap-1"
                            onClick={() => {
                              const newField = {
                                id: `field-${Date.now()}`,
                                type: "columns",
                                label: "2 Columns (Wide Left)",
                                columnCount: 2,
                                columnVariant: "left-large",
                                fields: []
                              };
                              if (activeFollowUpId && activeFollowUp) {
                                updateActiveFollowUp({ formFields: [...(activeFollowUp.formFields || []), newField] });
                              } else if (activeStep) {
                                updateActiveStep({ formFields: [...(activeStep.formFields || []), newField] });
                              }
                              toast.success("Added 2 columns (wide left) layout");
                            }}>
                            <div className="flex gap-1 items-center justify-center">
                              <div className="w-5 h-6 border-2 border-current rounded" />
                              <div className="w-2.5 h-6 border-2 border-current rounded" />
                            </div>
                            <span>2 Columns ...</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs mb-2">Form Fields</Label>
                        <p className="text-xs text-muted-foreground mb-3">Drag fields to canvas or click to add</p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("text");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("text")}>

                            <Type className="w-3 h-3 mr-1" />
                            Text
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("textarea");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("textarea")}>

                            <AlignLeft className="w-3 h-3 mr-1" />
                            Text Area
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("url");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("url")}>

                            <LinkIcon className="w-3 h-3 mr-1" />
                            URL
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("image");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("image")}>

                            <ImageIcon className="w-3 h-3 mr-1" />
                            Image
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("video");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("video")}>

                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("button");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("button")}>

                            <Maximize2 className="w-3 h-3 mr-1" />
                            Button
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("socials");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("socials")}>

                            <Share2 className="w-3 h-3 mr-1" />
                            Socials
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("checkbox");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("checkbox")}>

                            <CheckSquare className="w-3 h-3 mr-1" />
                            Checkbox
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("radio");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("radio")}>

                            <Circle className="w-3 h-3 mr-1" />
                            Radio
                          </Button>
                          <Button
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "copy";
                            handleFieldDragStart("dropdown");
                          }}
                          onDragEnd={() => setDraggedFieldType(null)}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start cursor-grab active:cursor-grabbing"
                          onClick={() => addFormField("dropdown")}>

                            <ChevronDown className="w-3 h-3 mr-1" />
                            Dropdown
                          </Button>
                        </div>

                        {/* Display Added Fields with Edit Functionality */}
                        {(activeFollowUp?.formFields || activeStep?.formFields) &&
                      (activeFollowUp?.formFields?.length || activeStep?.formFields?.length || 0) > 0 &&
                      <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Added Fields:</Label>
                            {(activeFollowUp?.formFields || activeStep?.formFields || []).map((field) =>
                        <div key={field.id} className="border border-border rounded-lg p-2">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {field.type === "text" && <Type className="w-3 h-3" />}
                                    {field.type === "textarea" && <AlignLeft className="w-3 h-3" />}
                                    {field.type === "url" && <LinkIcon className="w-3 h-3" />}
                                    {field.type === "image" && <ImageIcon className="w-3 h-3" />}
                                    {field.type === "video" && <Video className="w-3 h-3" />}
                                    {field.type === "button" && <Maximize2 className="w-3 h-3" />}
                                    {field.type === "socials" && <Share2 className="w-3 h-3" />}
                                    {field.type === "checkbox" && <CheckSquare className="w-3 h-3" />}
                                    {field.type === "radio" && <Circle className="w-3 h-3" />}
                                    {field.type === "dropdown" && <ChevronDown className="w-3 h-3" />}
                                    {field.type === "columns" && <Layout className="w-3 h-3" />}
                                    {field.type === "heading" && <Type className="w-3 h-3" />}
                                    {field.type === "textblock" && <Type className="w-3 h-3" />}
                                    {field.type === "link" && <LinkIcon className="w-3 h-3" />}
                                    {field.type === "linkbox" && <Maximize2 className="w-3 h-3" />}
                                    {field.type === "imagebox" && <ImageIcon className="w-3 h-3" />}
                                    {field.type === "map" && <Layout className="w-3 h-3" />}
                                    {field.type === "icon" && <Sparkles className="w-3 h-3" />}
                                    <span className="text-xs font-medium">{field.type}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => setEditingFieldId(editingFieldId === field.id ? null : field.id)}>

                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => removeFormField(field.id)}>

                                      <Trash2 className="w-3 h-3 text-destructive" />
                                    </Button>
                                  </div>
                                </div>
                                
                                {/* Edit Form when expanded */}
                                {editingFieldId === field.id &&
                          <div className="space-y-2 mt-2 pt-2 border-t border-border">
                                    <div>
                                      <Label className="text-xs mb-1">Label</Label>
                                      <Input
                                value={field.label}
                                onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                                className="text-xs h-7"
                                placeholder="Field label" />

                                    </div>
                                    
                                    {/* Column Configuration */}
                                    {field.type === "columns" && (
                                      <>
                                        <div>
                                          <Label className="text-xs mb-1">Column Count</Label>
                                          <Select
                                            value={field.columnCount?.toString() || "2"}
                                            onValueChange={(value) => {
                                              updateFormField(field.id, { 
                                                columnCount: parseInt(value),
                                                columnVariant: parseInt(value) === 2 ? field.columnVariant || "equal" : "equal"
                                              });
                                            }}>
                                            <SelectTrigger className="text-xs h-7">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="1">1 Column</SelectItem>
                                              <SelectItem value="2">2 Columns</SelectItem>
                                              <SelectItem value="3">3 Columns</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        
                                        {field.columnCount === 2 && (
                                          <div>
                                            <Label className="text-xs mb-1">Column Variant</Label>
                                            <Select
                                              value={field.columnVariant || "equal"}
                                              onValueChange={(value) => {
                                                updateFormField(field.id, { columnVariant: value });
                                              }}>
                                              <SelectTrigger className="text-xs h-7">
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="equal">Equal Width</SelectItem>
                                                <SelectItem value="left-large">Left Larger</SelectItem>
                                                <SelectItem value="right-large">Right Larger</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        )}

                                        {/* Add Fields to Columns */}
                                        <div className="pt-2 border-t border-border/50">
                                          <Label className="text-xs mb-2 block">Add Fields to Columns</Label>
                                          <div className="grid grid-cols-2 gap-1 mb-3">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="h-7 text-xs"
                                              onClick={() => addFieldToColumn(field.id, "text")}>
                                              <Type className="w-3 h-3 mr-1" />
                                              Text
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="h-7 text-xs"
                                              onClick={() => addFieldToColumn(field.id, "textarea")}>
                                              <AlignLeft className="w-3 h-3 mr-1" />
                                              Textarea
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="h-7 text-xs"
                                              onClick={() => addFieldToColumn(field.id, "checkbox")}>
                                              <CheckSquare className="w-3 h-3 mr-1" />
                                              Checkbox
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="h-7 text-xs"
                                              onClick={() => addFieldToColumn(field.id, "url")}>
                                              <LinkIcon className="w-3 h-3 mr-1" />
                                              URL
                                            </Button>
                                          </div>

                                          {/* Display Nested Fields */}
                                          {field.fields && field.fields.length > 0 && (
                                            <div className="space-y-1 max-h-32 overflow-y-auto">
                                              <Label className="text-xs text-muted-foreground mb-1 block">Fields in Columns:</Label>
                                              {field.fields.map((nestedField) => (
                                                <div key={nestedField.id} className="flex items-center justify-between p-1.5 bg-muted/30 rounded text-xs">
                                                  <span className="truncate">{nestedField.label}</span>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-5 w-5 p-0"
                                                    onClick={() => removeFieldFromColumn(field.id, nestedField.id)}>
                                                    <X className="w-3 h-3 text-destructive" />
                                                  </Button>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    )}
                                    
                                    {/* Placeholder for text, textarea, url */}
                                    {(field.type === "text" || field.type === "textarea" || field.type === "url") &&
                            <div>
                                        <Label className="text-xs mb-1">Placeholder</Label>
                                        <Input
                                value={field.placeholder || ""}
                                onChange={(e) => updateFormField(field.id, { placeholder: e.target.value })}
                                className="text-xs h-7"
                                placeholder="Enter placeholder text" />

                                      </div>
                            }
                                    
                                    {/* Button URL for button type */}
                                    {field.type === "button" &&
                            <div>
                                        <Label className="text-xs mb-1">Button URL</Label>
                                        <Input
                                value={field.buttonUrl || ""}
                                onChange={(e) => updateFormField(field.id, { buttonUrl: e.target.value })}
                                className="text-xs h-7"
                                placeholder="https://example.com" />
                                        <p className="text-xs text-muted-foreground mt-1">URL to redirect when button is clicked</p>
                                      </div>
                            }
                                    
                                    {/* File URL for image and video */}
                                    {(field.type === "image" || field.type === "video") &&
                            <div>
                                        <Label className="text-xs mb-1">{field.type === "image" ? "Image" : "Video"} URL</Label>
                                        <Input
                                value={field.fileUrl || ""}
                                onChange={(e) => updateFormField(field.id, { fileUrl: e.target.value })}
                                className="text-xs h-7"
                                placeholder={`https://example.com/${field.type === "image" ? "image.jpg" : "video.mp4"}`} />

                                        <p className="text-xs text-muted-foreground mt-1">Enter direct URL to {field.type}</p>
                                      </div>
                            }
                                    
                                    {/* Options for dropdown and radio */}
                                    {(field.type === "dropdown" || field.type === "radio") &&
                            <div>
                                        <Label className="text-xs mb-1">Options</Label>
                                        <div className="space-y-1">
                                          {field.options?.map((option, index) =>
                                <div key={index} className="flex gap-1">
                                              <Input
                                    value={option}
                                    onChange={(e) => updateOption(field.id, index, e.target.value)}
                                    className="text-xs h-7 flex-1"
                                    placeholder={`Option ${index + 1}`} />

                                              <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                    onClick={() => removeOption(field.id, index)}>

                                                <X className="w-3 h-3" />
                                              </Button>
                                            </div>
                                )}
                                          <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full h-7 text-xs"
                                  onClick={() => addOption(field.id)}>

                                            <Plus className="w-3 h-3 mr-1" />
                                            Add Option
                                          </Button>
                                        </div>
                                      </div>
                            }
                                  </div>
                          }
                              </div>
                        )}
                          </div>
                      }
                      </div>

                      {/* Merge Tags Block */}
                      <div className="pt-3 border-t border-border">
                        <Label className="text-xs mb-2 block">Merge Tags</Label>
                        <p className="text-xs text-muted-foreground mb-3">Click to insert into your content</p>
                        
                        <div className="space-y-2">
                          {[
                            { label: "First name", tag: "{{first_name}}" },
                            { label: "Last name", tag: "{{last_name}}" },
                            { label: "Organisation Name", tag: "{{organisation_name}}" }
                          ].map((mergeTag) => (
                            <button
                              key={mergeTag.tag}
                              onClick={() => {
                                insertMergeTag(mergeTag.tag);
                              }}
                              className="w-full flex items-center justify-between p-2 rounded-lg border border-border hover:bg-muted/50 hover:border-[#1DBFAA]/30 transition-all group">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">{mergeTag.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                                  {mergeTag.tag}
                                </code>
                                <Plus className="w-3 h-3 text-muted-foreground group-hover:text-[#1DBFAA] transition-colors" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Choose a Template</DialogTitle>
            <DialogDescription>
              Select a template to add as a new step in your popup flow
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto py-4">
            {templates.map((template) =>
            <motion.button
              key={template.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => applyTemplate(template)}
              className="text-left p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all">

                <div className={`w-full h-24 rounded-lg bg-gradient-to-br ${template.gradient} flex items-center justify-center text-4xl mb-3`}>
                  {template.preview}
                </div>
                <div className="font-medium text-sm mb-1">{template.name}</div>
                <div className="text-xs text-muted-foreground">{template.description}</div>
              </motion.button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal - FIXED */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview Flow</DialogTitle>
            <DialogDescription>
              Preview all steps and follow-ups in your popup flow
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] py-4">
            <div className="space-y-8">
              {popupFlow.steps.map((step, index) =>
              <div key={step.id} className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="text-sm font-semibold">Step {index + 1}: {step.name}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {/* Main Step */}
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Main Step</div>
                      {renderStepPreview(step, false, false)}
                    </div>
                    
                    {/* Follow-ups */}
                    {step.followUps && step.followUps.length > 0 &&
                  <div className="space-y-4">
                        <div className="text-xs text-muted-foreground mb-2">Follow-ups</div>
                        {step.followUps.map((followUp, fuIndex) =>
                    <div key={followUp.id}>
                            <div className="text-xs text-muted-foreground mb-2">Follow-up {fuIndex + 1}</div>
                            {renderStepPreview(followUp, false, true)}
                          </div>
                    )}
                      </div>
                  }
                  </div>
                  
                  {index < popupFlow.steps.length - 1 &&
                <div className="flex justify-center py-4">
                      <ArrowDown className="w-5 h-5 text-muted-foreground" />
                    </div>
                }
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Follow-up Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Follow-up Settings</DialogTitle>
            <DialogDescription>
              Configure advanced settings for this follow-up step
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(90vh-180px)] py-4">
            {settingsFollowUpId && (() => {
              const parentStep = popupFlow.steps.find(s => 
                s.followUps?.some(fu => fu.id === settingsFollowUpId)
              );
              const followUp = parentStep?.followUps?.find(fu => fu.id === settingsFollowUpId);
              
              if (!followUp) return null;
              
              return (
                <div className="space-y-6">
                  {/* Follow-up Name */}
                  <div>
                    <Label className="text-sm mb-2 block">Follow-up Name</Label>
                    <Input
                      value={followUp.name}
                      onChange={(e) => {
                        setPopupFlow({
                          ...popupFlow,
                          steps: popupFlow.steps.map(step => ({
                            ...step,
                            followUps: step.followUps?.map(fu =>
                              fu.id === settingsFollowUpId
                                ? { ...fu, name: e.target.value }
                                : fu
                            )
                          }))
                        });
                      }}
                      placeholder="Enter follow-up name"
                      className="text-sm h-9"
                    />
                  </div>

                  {/* Conditional Logic Configuration */}
                  <div className="border border-border rounded-lg p-4">
                    <Label className="text-sm font-semibold mb-2 block">⚡ Conditional Logic</Label>
                    <p className="text-xs text-muted-foreground mb-4">
                      Set when this follow-up should appear based on user interactions
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs mb-2 block">Trigger Type</Label>
                        <Select
                          value={followUp.condition?.type || "button_click"}
                          onValueChange={(value) => {
                            setPopupFlow({
                              ...popupFlow,
                              steps: popupFlow.steps.map(step => ({
                                ...step,
                                followUps: step.followUps?.map(fu =>
                                  fu.id === settingsFollowUpId
                                    ? {
                                        ...fu,
                                        condition: {
                                          ...fu.condition,
                                          type: value,
                                          targetElement: "",
                                          targetType: value === "button_click" ? "button" :
                                                      value === "form_submit" ? "form_field" :
                                                      value === "checkbox_check" ? "checkbox" : "button"
                                        }
                                      }
                                    : fu
                                )
                              }))
                            });
                          }}>
                          <SelectTrigger className="text-xs h-9">
                            <SelectValue placeholder="Select trigger type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="button_click">Button Click</SelectItem>
                            <SelectItem value="form_submit">Form Submit</SelectItem>
                            <SelectItem value="field_interaction">Field Interaction</SelectItem>
                            <SelectItem value="checkbox_check">Checkbox Check</SelectItem>
                            <SelectItem value="element_click">Element Click</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {followUp.condition?.type && (
                        <>
                          <div>
                            <Label className="text-xs mb-2 block">Target Element Type</Label>
                            <Select
                              value={followUp.condition?.targetType || "button"}
                              onValueChange={(value) => {
                                setPopupFlow({
                                  ...popupFlow,
                                  steps: popupFlow.steps.map(step => ({
                                    ...step,
                                    followUps: step.followUps?.map(fu =>
                                      fu.id === settingsFollowUpId
                                        ? {
                                            ...fu,
                                            condition: {
                                              ...fu.condition,
                                              targetType: value
                                            }
                                          }
                                        : fu
                                    )
                                  }))
                                });
                              }}>
                              <SelectTrigger className="text-xs h-9">
                                <SelectValue placeholder="Select element type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="button">Button</SelectItem>
                                <SelectItem value="headline">Headline</SelectItem>
                                <SelectItem value="subheadline">Subheadline</SelectItem>
                                <SelectItem value="form_field">Form Field</SelectItem>
                                <SelectItem value="checkbox">Checkbox</SelectItem>
                                <SelectItem value="radio">Radio Button</SelectItem>
                                <SelectItem value="dropdown">Dropdown</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-xs mb-2 block">Element Identifier</Label>
                            <Input
                              value={followUp.condition?.targetElement || ""}
                              onChange={(e) => {
                                setPopupFlow({
                                  ...popupFlow,
                                  steps: popupFlow.steps.map(step => ({
                                    ...step,
                                    followUps: step.followUps?.map(fu =>
                                      fu.id === settingsFollowUpId
                                        ? {
                                            ...fu,
                                            condition: {
                                              ...fu.condition,
                                              targetElement: e.target.value
                                            }
                                          }
                                        : fu
                                    )
                                  }))
                                });
                              }}
                              placeholder="e.g., claim-offer-button, email-field"
                              className="text-sm h-9"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              {followUp.condition?.targetType === "button" && "Enter the button text or unique ID"}
                              {followUp.condition?.targetType === "form_field" && "Enter the field label or unique ID"}
                              {followUp.condition?.targetType === "headline" && "This will trigger when user clicks the headline"}
                              {followUp.condition?.targetType === "subheadline" && "This will trigger when user clicks the subheadline"}
                              {(followUp.condition?.targetType === "checkbox" || 
                                followUp.condition?.targetType === "radio" ||
                                followUp.condition?.targetType === "dropdown") && 
                                "Enter the field label or unique ID"}
                            </p>
                          </div>

                          {/* Preview */}
                          <div className="bg-muted/50 rounded-lg p-4 mt-4">
                            <div className="flex items-start gap-3">
                              <Sparkles className="w-5 h-5 text-[#1DBFAA] mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm font-medium mb-2">Condition Summary:</p>
                                <p className="text-sm text-muted-foreground">
                                  {followUp.condition.type === "button_click" && 
                                    `This follow-up will appear when user clicks on ${followUp.condition.targetElement || "the button"}`}
                                  {followUp.condition.type === "form_submit" && 
                                    `This follow-up will appear when user submits ${followUp.condition.targetElement || "the form"}`}
                                  {followUp.condition.type === "field_interaction" && 
                                    `This follow-up will appear when user interacts with ${followUp.condition.targetElement || "a field"}`}
                                  {followUp.condition.type === "checkbox_check" && 
                                    `This follow-up will appear when user checks ${followUp.condition.targetElement || "a checkbox"}`}
                                  {followUp.condition.type === "element_click" && 
                                    `This follow-up will appear when user clicks ${followUp.condition.targetElement || "an element"}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Display Settings */}
                  <div className="border border-border rounded-lg p-4">
                    <Label className="text-sm font-semibold mb-2 block">Display Settings</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm">Show Background Image</Label>
                          <p className="text-xs text-muted-foreground">Display background image in this follow-up</p>
                        </div>
                        <Switch
                          checked={followUp.showImage}
                          onCheckedChange={(checked) => {
                            setPopupFlow({
                              ...popupFlow,
                              steps: popupFlow.steps.map(step => ({
                                ...step,
                                followUps: step.followUps?.map(fu =>
                                  fu.id === settingsFollowUpId
                                    ? { ...fu, showImage: checked }
                                    : fu
                                )
                              }))
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSettingsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#1DBFAA] hover:bg-[#1DBFAA]/90"
              onClick={() => {
                setSettingsDialogOpen(false);
                toast.success("Settings saved successfully");
              }}
            >
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}