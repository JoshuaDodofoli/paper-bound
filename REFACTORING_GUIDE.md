# DDD Refactoring Migration Guide

## ✅ Completed

### Domain Layer Created
```
domain/
  ├── books/
  │   ├── types.ts          ✅ Moved from app/lib/interface.ts
  │   ├── fixtures.ts       ✅ Moved from app/lib/books.ts (MOCK_BOOKS)
  │   └── queries.ts        (Ready for API integration)
  ├── authors/
  │   ├── types.ts          ✅ Moved from app/lib/interface.ts
  │   └── queries.ts        (Ready for API integration)
  ├── users/
  │   ├── types.ts          ✅ Moved from app/lib/interface.ts
  │   └── queries.ts        (Ready for API integration)
  ├── collections/
  │   ├── types.ts          ✅ Moved from app/lib/store.ts
  │   └── queries.ts        (Ready for API integration)
  └── catalog/
      ├── queries.ts        ✅ Moved from app/lib/utils/BookSearch.ts
      └── hardcover.ts      ✅ Moved from app/lib/utils/HardCoverSearch.ts
```

### Features Layer Created
```
features/
  ├── shelf/
  │   ├── state/
  │   │   └── useShelfStore.ts  ✅ Moved from app/lib/store.ts (useCollectionStore)
  │   └── lib/
  └── profile/
      └── state/
```

### Hooks Centralized
```
hooks/
  ├── ui/
  │   └── useToast.ts           ✅ Moved from app/lib/hooks/useToast.ts
  └── gestures/
```

## 📋 Remaining Tasks

### 1. Move Components to New Structure
**Source:** `app/dashboard/(components)/`
**Target:** `components/` (organized by layer)

```
components/
├── chrome/dashboard/
│   ├── Header.tsx              ← from (components)/header/Header.tsx
│   ├── Footer.tsx              ← from (components)/footer/Footer.tsx
│   ├── Navbar.tsx              ← from (components)/navbar/Navbar.tsx
│   ├── SearchModal.tsx         ← from (components)/navbar/SearchModal.tsx
│   ├── UserMenu.tsx            ← from (components)/header/UserMenu.tsx
│   ├── AuthorResultItem.tsx    ← from (components)/navbar/AuthorResultItem.tsx
│   ├── BookResultItem.tsx      ← from (components)/navbar/BookResultItem.tsx
│   ├── GenreResultItem.tsx     ← from (components)/navbar/GenreResultItem.tsx
│   ├── QuickSuggestions.tsx    ← from (components)/navbar/QuickSuggestions.tsx
│   └── AuthorSearchAvatar.tsx  ← from (components)/ui/AuthorSearchAvatar.tsx
│
├── domain/books/
│   └── BookCard.tsx            ← from (components)/book/BookCard.tsx
│
├── overlays/
│   ├── Modal.tsx               ← from (components)/ui/Modal.tsx
│   ├── Toast.tsx               ← from (components)/ui/Toast.tsx
│   ├── Dropdown.tsx            ← from (components)/ui/Dropdown.tsx
│   └── dropdown.types.ts       (Create if needed)
│
└── primitives/
    └── BackButton.tsx          ← from (components)/ui/BackButton.tsx
```

### 2. Update All Imports
**Files to update:**
- `app/layout.tsx`
- `app/dashboard/layout.tsx`
- All route pages in `app/dashboard/**`
- `app/dashboard/(components)/**` (before moving)

**Import changes pattern:**
```typescript
// ❌ OLD
import Navbar from "../components/navbar/Navbar";
import { useToast } from "@/lib/hooks/useToast";
import { searchBooks } from "@/lib/utils/BookSearch";
import { useCollectionStore } from "@/lib/store";
import type { Book, Author } from "@/lib/interface";

// ✅ NEW
import Navbar from "@/components/chrome/dashboard/Navbar";
import { useToast } from "@/hooks/ui/useToast";
import { searchBooks } from "@/domain/catalog/queries";
import { getAuthor } from "@/domain/catalog/hardcover";
import { useShelfStore } from "@/features/shelf/state/useShelfStore";
import type { Book } from "@/domain/books/types";
import type { Author } from "@/domain/authors/types";
```

### 3. Remove Old Directories
```
rm -r app/lib/
rm -r app/dashboard/(components)/
rm -r app/components/  (if exists)
```

### 4. Update app/layout.tsx
Remove any imports from old locations:
```typescript
// Remove these lines
import Navbar from "./dashboard/(components)/navbar/Navbar";
import Header from "./dashboard/(components)/header/Header";
import Wrapper from "./components/Wrapper";
```

### 5. Test & Validate
```bash
npm run build
npm run lint
npm run dev
```

## File-by-File Import Updates Needed

### app/layout.tsx
- ✅ Already cleaned (should have no dashboard imports)

### app/dashboard/layout.tsx
```typescript
// Change these imports:
import Transition from "@/components/chrome/dashboard/Transition";
import Footer from "@/components/chrome/dashboard/Footer";
import Header from "@/components/chrome/dashboard/Header";
import Navbar from "@/components/chrome/dashboard/Navbar";
```

### All app/dashboard pages
- Update imports for:
  - `useShelfStore` → `@/features/shelf/state/useShelfStore`
  - `useToast` → `@/hooks/ui/useToast`
  - `Book`, `Author` types → `@/domain/{books,authors}/types`
  - `searchBooks`, `getAuthorDetailsBySlug` → `@/domain/catalog/queries`
  - Components → `@/components/{chrome,overlays,primitives,domain}/`

## Benefits After Migration

✅ **Clear Separation of Concerns**
- Business logic in `domain/`
- Feature state in `features/`
- UI components organized by complexity in `components/`

✅ **Better Scalability**
- Adding new features just requires new folders
- Easy to find related code
- Components can be swapped without touching business logic

✅ **Type Safety**
- Types live next to their domain logic
- Single source of truth for interfaces

✅ **API-Ready**
- Queries can be connected to real APIs easily
- No UI code needs to change

✅ **Professional Structure**
- Follows industry best practices
- Easier for team onboarding
- Matches established patterns
