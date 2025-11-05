import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Sparkles, 
  X, 
  GripVertical, 
  ImageIcon, 
  Video, 
  Share2, 
  CheckSquare, 
  Circle, 
  Type,
  AlignLeft,
  LinkIcon,
  Maximize2,
  Layout
} from "lucide-react";

interface PopupPreviewProps {
  config: any;
  isActive: boolean;
  isFollowUp?: boolean;
  popupFlow: any;
  editingElement: string | null;
  editingFieldId: string | null;
  setEditingElement: (element: string | null) => void;
  setEditingFieldId: (id: string | null) => void;
  setCursorPosition: (pos: number) => void;
  onUpdate: (updates: any) => void;
  onUpdateField: (fieldId: string, updates: any) => void;
  onRemoveField: (fieldId: string) => void;
  draggedFieldIndex: number | null;
  setDraggedFieldIndex: (index: number | null) => void;
  onReorderField: (fromIndex: number, toIndex: number) => void;
}

export function PopupPreview({
  config,
  isActive,
  isFollowUp = false,
  popupFlow,
  editingElement,
  editingFieldId,
  setEditingElement,
  setEditingFieldId,
  setCursorPosition,
  onUpdate,
  onUpdateField,
  onRemoveField,
  draggedFieldIndex,
  setDraggedFieldIndex,
  onReorderField
}: PopupPreviewProps) {
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
                    onUpdate({ showImage: false });
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
          {isActive && editingElement === "headline" && (
            <div className="absolute -top-3 -right-3 flex gap-1 z-20">
              <Button
                variant="outline"
                size="sm"
                className="h-6 w-6 p-0 rounded-full shadow-lg bg-background border-border hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate({ headline: "" });
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
              onChange={(e) => onUpdate({ headline: e.target.value })}
              onSelect={(e: any) => setCursorPosition(e.target.selectionStart)}
              onClick={(e: any) => setCursorPosition(e.target.selectionStart)}
              onKeyUp={(e: any) => setCursorPosition(e.target.selectionStart)}
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
                  onUpdate({ subheadline: "" });
                  setEditingElement(null);
                }}
                title="Remove subheadline"
              >
                <X className="w-3 h-3 text-destructive" />
              </Button>
            </div>
          )}

          {editingElement === "subheadline" && isActive ? (
            <Input
              value={config.subheadline}
              onChange={(e) => onUpdate({ subheadline: e.target.value })}
              onSelect={(e: any) => setCursorPosition(e.target.selectionStart)}
              onClick={(e: any) => setCursorPosition(e.target.selectionStart)}
              onKeyUp={(e: any) => setCursorPosition(e.target.selectionStart)}
              onBlur={() => setEditingElement(null)}
              autoFocus
              className="text-sm text-center"
              style={{ color: config.backgroundImage ? '#ffffff' : config.textColor }}
            />
          ) : (
            config.subheadline
          )}
        </div>
        
        {/* Form Fields */}
        {config.formFields && config.formFields.length > 0 && (
          <div className="space-y-2 mb-4">
            {config.formFields.map((field: any, index: number) => (
              <div
                key={field.id}
                draggable={isActive}
                onDragStart={() => setDraggedFieldIndex(index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (draggedFieldIndex !== null && draggedFieldIndex !== index) {
                    onReorderField(draggedFieldIndex, index);
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
                {/* Add other field type renderings here as needed */}
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
                  onUpdate({ buttonText: "" });
                  setEditingElement(null);
                }}
                title="Remove button text"
              >
                <X className="w-3 h-3 text-destructive" />
              </Button>
            </div>
          )}

          {editingElement === "button" && isActive ? (
            <Input
              value={config.buttonText}
              onChange={(e) => onUpdate({ buttonText: e.target.value })}
              onSelect={(e: any) => setCursorPosition(e.target.selectionStart)}
              onClick={(e: any) => setCursorPosition(e.target.selectionStart)}
              onKeyUp={(e: any) => setCursorPosition(e.target.selectionStart)}
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
}
