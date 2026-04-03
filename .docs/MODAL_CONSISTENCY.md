# Modal Consistency Documentation

## Overview
All modals across the CKC Alumni dashboard follow a consistent pattern for a unified user experience.

## Modal Standards

### 1. **DeleteConfirmModal** (Shared Component)
**Location:** `components/admin/DeleteConfirmModal.tsx`

**Features:**
- ✅ Uses `createPortal` to render at document.body level
- ✅ Manages body scroll (prevents background scrolling)
- ✅ Mounted state check for SSR compatibility
- ✅ z-index: 100
- ✅ Backdrop: `bg-black/60 backdrop-blur-sm`
- ✅ Animation: `animate-in fade-in zoom-in-95 duration-200`
- ✅ Decorative background gradients
- ✅ Loading states with spinner
- ✅ Consistent button styling

**Usage:**
```tsx
<DeleteConfirmModal
    isOpen={deleteModalOpen}
    onClose={() => setDeleteModalOpen(false)}
    onConfirm={handleDelete}
    title="Delete Item?"
    description="This action cannot be undone..."
    loading={isDeleting}
/>
```

**Used In:**
- Members List (MembersListClient)
- Member Detail (MemberDetailClient)
- Posts (PostCard)
- Events (EventsManagerClient)

---

### 2. **EditPostModal**
**Location:** `components/posts/EditPostModal.tsx`

**Features:**
- ✅ Uses `createPortal` to render at document.body level
- ✅ Manages body scroll (prevents background scrolling)
- ✅ Mounted state check for SSR compatibility
- ✅ z-index: 100
- ✅ Backdrop: `bg-black/60 backdrop-blur-sm`
- ✅ Animation: `animate-in fade-in zoom-in-95 duration-200`
- ✅ Decorative background gradients
- ✅ Loading states with spinner
- ✅ Consistent button styling
- ✅ Form validation

**Usage:**
```tsx
<EditPostModal
    isOpen={showEditModal}
    onClose={() => setShowEditModal(false)}
    onSave={handleEdit}
    post={post}
    loading={isSaving}
/>
```

**Used In:**
- Posts (PostCard)

---

### 3. **Form Modals** (MemberForm, EventForm)
**Location:** 
- `components/admin/MemberForm.tsx`
- `components/admin/EventForm.tsx`

**Features:**
- ⚠️ Rendered inside parent component modal wrapper
- ✅ z-index: 60 (parent wrapper)
- ✅ Backdrop: `bg-black/60 backdrop-blur-sm`
- ✅ Animation: `animate-in fade-in zoom-in duration-300`
- ✅ Loading states with spinner
- ✅ Consistent button styling
- ✅ Form validation
- ✅ Error handling

**Parent Wrapper Pattern:**
```tsx
{isFormOpen && (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300 shadow-2xl">
            <MemberForm
                onClose={() => setIsFormOpen(false)}
                onSuccess={() => {
                    setIsFormOpen(false);
                    fetchMembers();
                }}
            />
        </div>
    </div>
)}
```

**Used In:**
- Members List (MembersListClient) - wraps MemberForm
- Events Manager (EventsManagerClient) - wraps EventForm

---

## Consistency Checklist

### Visual Consistency
- ✅ All modals use rounded-[2rem] or rounded-[2.5rem]
- ✅ All modals have shadow-2xl
- ✅ All modals use backdrop-blur-sm
- ✅ All modals have decorative background gradients
- ✅ All buttons use consistent padding (px-6 py-4)
- ✅ All buttons use rounded-xl
- ✅ Cancel buttons: bg-gray-50 text-gray-600
- ✅ Primary buttons: bg-primary text-white with shadow
- ✅ Delete buttons: bg-red-500 text-white with shadow

### Behavioral Consistency
- ✅ All modals prevent body scroll when open
- ✅ All modals restore body scroll when closed
- ✅ All modals check mounted state for SSR
- ✅ All modals use createPortal (except form wrappers)
- ✅ All modals have loading states
- ✅ All modals disable buttons during loading
- ✅ All modals show spinner during loading

### Animation Consistency
- ✅ Backdrop: animate-in fade-in duration-200
- ✅ Modal content: animate-in zoom-in-95 duration-200
- ✅ Smooth transitions on all interactive elements

### Z-Index Hierarchy
- z-[100]: DeleteConfirmModal, EditPostModal (top-level)
- z-[60]: Form modal wrappers (below confirmation modals)
- z-10: Internal decorative elements

---

## Best Practices

1. **Always use createPortal** for standalone modals
2. **Always manage body scroll** to prevent background scrolling
3. **Always check mounted state** for SSR compatibility
4. **Always show loading states** during async operations
5. **Always disable buttons** during loading
6. **Always use consistent styling** from the design system
7. **Always provide clear titles and descriptions**
8. **Always include cancel and confirm actions**

---

## Example Implementation

```tsx
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Loader2, AlertTriangle } from "lucide-react";

interface MyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    loading?: boolean;
}

export function MyModal({ isOpen, onClose, onConfirm, loading = false }: MyModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-md p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />
                
                <div className="relative z-10">
                    {/* Modal Content */}
                    <div className="flex gap-3 pt-4">
                        <button
                            disabled={loading}
                            onClick={onClose}
                            className="flex-1 px-6 py-4 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            onClick={onConfirm}
                            className="flex-1 px-6 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
                            ) : (
                                "Confirm"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
```

---

## Summary

All modals in the CKC Alumni dashboard now follow a consistent pattern:
- **Visual Design**: Unified styling with rounded corners, shadows, and gradients
- **Behavior**: Proper scroll management and SSR compatibility
- **Animations**: Smooth fade-in and zoom effects
- **Loading States**: Clear feedback during async operations
- **Accessibility**: Proper focus management and keyboard support

This ensures a professional, polished user experience across all CRUD operations.
