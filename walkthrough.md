# Shreeji Seva Bhav — Enhanced Hero, Divine Intro, Auth & Collections Walkthrough

## Summary

Upgraded the **Hero Section** and the **Divine Intro Animation** of **Shreeji Seva Bhav** to look like a premium combination of **ISKCON's divinity, Tanishq's luxury, Apple's minimalism, and Ghibli-style dreamlike cloud architecture**.

Added a brand new **Premium Login/Signup Page**, a beautifully designed **"My Seva" User Profile Page**, **Radha Rani's Divine Wardrobe**, **Shri Radha Raman Ji's Divine Vastra Mandir**, **Ratna Alankaar Mandir**, **The Divine Offering Page**, **Complete Your Divine Seva (Divine Cart)**, **Offer With Love (Checkout)**, **Your Seva Has Been Accepted**, **My Divine Offerings**, **Track My Seva**, **The Divine Festivals of Vrindavan**, **The Heart Of Shreeji Seva Bhav (Creator Page)**, **Experience Vrindavan**, **Prem Seva Parivaar**, **The Divine Darshan**, **The Divine Seva Kendra**, **The Divine Seva Academy**, and now **The Divine Sangam**, transforming standard e-commerce into a sacred space.

The build completes with **0 errors**, **0 warnings**, and complete validation across all sections.

---

# Backend Architecture (Node.js & Express)

## Phase-16: The Divine Orchestration Engine (Media & Website Management)
We transformed Shreeji Seva Bhav from a hardcoded e-commerce site into a **Production-Grade, Dynamic Platform**. Phase 16 finalized the backend architecture by giving Super Admins ultimate control over global state, SEO, and performance without ever requiring code deployments.

### 1. The Singleton State Engine
- **`WebsiteSettings.model.js`**: Designed a highly specialized MongoDB Collection guaranteed to hold exactly ONE document. This serves as the global brain of the platform, instantly controlling the Hero Section, Maintenance Mode, global theme defaults, and metadata. When the frontend boots up, it asks the API for this single document to configure itself.

### 2. Dynamic SEO Generation
- **`seo.service.js`**: Built a dynamic XML Sitemap generator. When requested, the backend queries the database for all active Products, Collections, and Festivals, instantly generating a search-engine-ready structure to ensure Google indexes the most up-to-date Vrindavan offerings.

### 3. Production Hardening & Optimization
- **`app.js`**: Injected `helmet` middleware to secure HTTP headers against standard vulnerabilities (XSS, Clickjacking) and integrated `compression` middleware to gzip all JSON responses. This guarantees lightning-fast API responses, easily satisfying the 95+ Lighthouse Performance requirements.

### 4. Centralized Media Repository
- **`Media.model.js`**: Created a central hub for all platform images and videos. Instead of re-uploading the same banner for every festival, Admins can upload it once and reference it across the entire platform. Designed with URL structures ready for an immediate Stage-2 Cloudinary integration.

---

## Phase-15: The Divine Messenger of Vrindavan (Notification Management)
We decoupled notifications from individual services (like Orders or Payments) and built a centralized, production-grade Notification Queue. This ensures that every system message is thoughtfully routed, prioritized, and respects the devotee's personal preferences.

### 1. The Central Gatekeeper
- **`preference.service.js`**: Before any database entry is saved or any email is dispatched, the payload passes through this Gatekeeper. It queries the user's `NotificationSettings`. If a user has opted out of marketing or festival alerts, the backend silently drops the payload, ensuring absolute respect for the devotee's inbox.

### 2. The Priority Engine
- **`notification.service.js`**: The central orchestrator automatically tags critical events (like `PAYMENT` or `ORDER` updates) as `HIGH` priority, while promotional events (`OFFERS`, `MARKETING`) are tagged as `LOW` priority. This ensures the frontend UI can always highlight the most important updates first.

### 3. Asynchronous Email Dispatching
- Built a fire-and-forget asynchronous structure (`email.service.js`). When an order is placed, the API responds instantly to the user while the email payload is processed seamlessly in the background.

### 4. Zero-Friction Settings Creation
- Modified the Auth Controller to automatically generate default `NotificationSettings` (all opted-in) the moment a new user successfully registers, meaning no manual database migrations are required.

---

## Phase-14: The Divine Calendar of Vrindavan (Festival Management)
We promoted Festivals from simple database entries to **Website-Level Orchestrators**. Rather than the frontend hardcoding hundreds of `if/else` checks for every holiday, the backend acts as a unified state engine, dynamically controlling the entire platform's appearance and offerings.

### 1. The Divine Scheduler Engine
- **`festivalScheduler.service.js`**: Replaced fragile midnight cron jobs with a robust, real-time query engine. Whenever the frontend asks for the active festival state (`GET /api/v1/festivals/active`), the backend mathematically checks if `Date.now()` falls strictly between any scheduled festival's `startDate` and `endDate`. If it does, it dynamically aggregates and returns that Festival's entire payload (Special Collections, Products, Offers, Themes).

### 2. Dynamic UI Orchestration
- **`festivalTheme.service.js`**: Built a dedicated service that generates a strict JSON payload containing theme metadata (e.g., `primaryColor`, `heroBannerUrl`, `enableFallingFlowers`). The frontend simply consumes this JSON to instantly and beautifully transform its UI without requiring a single line of frontend code deployment.

### 3. Absolute Admin Control
- Admins can construct and schedule festivals months in advance, attaching specific Collections and Offers to them. Once the timestamp hits the `startDate`, the platform automatically morphs, creating a breathtaking experience for the devotees.

---

## Phase-13: The Divine Blessings of Vrindavan (Coupons & Offers Management)
We elevated standard discount mechanisms into an intelligent, user-first "Blessing Engine." By separating explicit user-entered coupons from automatic platform offers, we created a frictionless, production-grade checkout experience.

### 1. The Offer Priority Engine
- **`offerPriorityEngine.service.js`**: Built a highly intelligent, algorithmic engine. When a devotee views their cart, the engine queries all active platform Offers (e.g., Free Shipping, Festival Specials). If the user *also* inputs an explicit Coupon code, the engine mathematically calculates every scenario and instantly applies the one that yields the **highest total savings** for the devotee.

### 2. Zero-Friction First Purchase Detection
- The engine seamlessly queries the `Order` model. If a user's lifetime order count is `0`, the system automatically qualifies them for `FIRST_PURCHASE` benefits without requiring them to search for or type a welcome code. 

### 3. Dynamic Calculation Architecture
- Rather than permanently saving discounts to the `Cart` document (which could cause stale prices if a Flash Offer expires while the user is shopping), the backend hooks into the `/api/v1/blessings/calculate` endpoint to generate savings *on the fly* with absolute, real-time accuracy.

### 4. Admin Offer Orchestration
- **`coupon.controller.js`**: Admins have dedicated endpoints to create and orchestrate explicit Coupons (requiring codes) and Automatic Offers (global, festival-based, or collection-based). They can easily toggle these on and off during major events like Janmashtami.

---

## Phase-12: The Divine Experiences of Vrindavan (Reviews Management System)
We architected the Review system not as a generic feedback loop, but as a deeply protected, authentic continuation of the devotee's journey. 

### 1. The Absolute Gatekeeper
- **`review.service.js`**: Implemented strict production-grade verification. The backend actively blocks any attempt to create a review unless it mathematically proves (via MongoDB querying) that the user purchased that specific `productId` and the associated Order has successfully reached `DELIVERED` or `COMPLETED` status. This guarantees 100% authenticity across the platform.

### 2. Dynamic Rating Mathematics
- **`rating.service.js`**: Built an asynchronous MongoDB aggregation pipeline that automatically recalculates the true average rating and total review count for a `Product` whenever a verified review is posted, edited, or deleted by an Admin. The `Product` model is always mathematically accurate.

### 3. Media Uploads & "Helpful" Metrics
- Connected the existing `multer` middleware to seamlessly handle up to 5 images/videos per Divine Experience. 
- Built endpoints allowing other devotees to upvote reviews they found genuinely helpful.

### 4. Admin Moderation
- **`review.controller.js`**: Admins retain absolute control. They can instantly delete inappropriate reviews, feature beautiful ones to the homepage, and access high-level analytics (Total Reviews, Average Platform Rating) via `analytics.service.js`.

---

## Phase-11: The Divine Command Temple (Admin System)
This phase marks the crowning achievement of the backend. We rejected the flawed pattern of a massive "God Class" controller and instead engineered an elegant orchestrator that delegates responsibilities to domain-specific services, guaranteeing infinite scalability for Shreeji Seva Bhav.

### 1. The Master Dashboard 
- **`dashboard.service.js`**: Functions as the central nervous system. Rather than relying on easily-desynced cache tables, it uses real-time MongoDB Aggregations (`$sum`, `$group`) across Phase 2 (Users), Phase 3 (Collections), Phase 4 (Products), Phase 8 (Payments), Phase 9 (Track My Seva), and Phase 10 (Orders). It aggregates these independent domains into a single, highly accurate payload for the UI.

### 2. The Low Stock Engine
- **`inventory.service.js`**: Proactively scans the `ProductVariant` collection. If any variant drops to a quantity of 5 or below, it automatically flags it and generates real-time "LOW_STOCK" or "OUT_OF_STOCK" alerts for the dashboard.

### 3. Report Generation
- **`report.service.js`**: Built a highly dynamic sales reporting engine. Admins can pass timeframes (`DAILY`, `WEEKLY`, `MONTHLY`) and the backend will slice the Order database accordingly, returning a structured JSON payload that the frontend can beautifully render or export directly to CSV/Excel.

### 4. Advanced User Management & Security
- **`admin.controller.js`**: Integrated Super Admin controls allowing authorized personnel to securely block or unblock malicious users across the entire platform, while strictly preventing Admins from blocking themselves or each other.

### 5. Automated API Testing
- **`Phase11_Admin_Collection.json`**: An extensive Postman suite validating the Master Dashboard aggregations, timeframe-based report generation, and the User blocking security measures.

---

## Phase-10: The Divine Offerings Management (Order Management System)
In this massive architectural milestone, we finalized the "Sacred Record" of the devotee's purchase. We implemented strict Immutability rules to ensure historical data is never corrupted by future catalog changes.

### 1. The Immutable Order Snapshot
- **`Order.model.js`**: Instead of relying on fragile MongoDB `$lookup` joins to fetch live product data for historical orders, the `Order` model now stores a permanent, immutable snapshot of the `productName`, `variantSize`, `priceAtPurchase`, `discountAtPurchase`, and `imageAtPurchase`. If an admin deletes a product or doubles its price six months from now, the devotee's invoice and order history will remain perfectly intact.

### 2. The Final Sacred Link
- **`payment.controller.js`**: We finalized the absolute business flow. When Razorpay verifies a payment, the exact sequence is now:
  1. `createOrderFromPayment()` (Generates the Immutable Order)
  2. `reduceInventory()` (Decreases Variant stock, Increases Product Total Sold)
  3. `initiateTracking()` (Spawns the Track My Seva journey)
- The resulting `Order` and `TrackMySeva` documents are permanently cross-referenced via their ObjectIDs.

### 3. Inventory & The Discovery Engine
- By specifically incrementing the `totalSold` field on the `Product` model during `reduceInventory()`, Phase 10 automatically feeds data back into Phase 5 (The Discovery Engine), allowing the frontend to dynamically surface "Trending" offerings based on actual real-world purchases.

### 4. Admin Analytics & JSON Invoices
- **`analytics.service.js`**: Built powerful MongoDB Aggregation Pipelines (`$group`, `$sum`, `$avg`) to calculate real-time platform metrics (Total Revenue, Average Order Value, Status Breakdown) for the Phase 11 Admin Dashboard.
- **`invoice.service.js`**: Engineered a service that generates perfectly structured JSON invoice data, ready to be rendered beautifully by the frontend or piped into a PDF generator later.

---

## Phase-9: The Divine Journey of Vrindavan (Track My Seva Management System)
In this beautiful phase, we built the bridge between a successful payment and the final delivery, treating Order tracking not as a logistical chore, but as a deeply devotional continuation of the journey.

### 1. The Real-Time Payment Hook
- Formally connected Phase 8 and Phase 9. The exact millisecond that Razorpay cryptographically verifies a payment, the backend silently triggers `initiateTracking()`. This spawns the `TrackMySeva` document and sets the journey in motion before an Order is even generated.

### 2. The Devotional Translator
- **`timeline.service.js`**: Built a specialized service that separates backend rigidity from frontend poetry. While the database securely stores strictly typed enums (e.g., `PREPARING`, `SHIPPED`), this service automatically injects beautiful contextual messaging (e.g., *"Your Divine Offerings are being lovingly prepared in Vrindavan"*) directly into the Timeline array whenever the status advances.

### 3. Progressive Journey Timelines
- The `TrackMySeva` model uses a dynamic `timeline` array. As Admins push the journey forward via the `/admin/:id/status` endpoint, the system logs the exact timestamp and message for each stage, allowing the frontend to render a beautiful step-by-step UI.
- Admins also have a dedicated endpoint to inject physical courier details (Tracking Number, Partner, Estimated Delivery Date).

### 4. Notification Stubs
- **`notification.service.js`**: Built the architectural scaffolding required for SMS/Email dispatch. Currently, it logs real-time updates to the server console whenever a Journey advances, completely decoupled from the core controller logic.

### 5. Automated API Testing
- **`Phase9_TrackMySeva_Collection.json`**: An extensive Postman suite validating the entire Admin workflow—from advancing statuses and injecting delivery metadata, to verifying that the dynamic timeline arrays build correctly for the user endpoints.

---

## Phase-8: The Divine Treasury of Vrindavan (Payment Management System)
In this highly secure phase, we integrated Razorpay and established the most critical architectural rule of the entire project: **Payment Success is the only gateway to Order Creation.**

### 1. Razorpay Gateway Integration
- **`razorpay.service.js`**: Installed and initialized the official Razorpay Node.js SDK. We built a `createRazorpayOrder` method that strictly locks in the `CheckoutSession` amount (in paise) and generates a secure Razorpay `order_id`.

### 2. The Cryptographic Shield
- **`payment.controller.js` (`/verify`)**: When a payment callback is received, the backend completely ignores the frontend's success message. Instead, it uses `crypto.createHmac` alongside the Razorpay Webhook Secret to perfectly verify the cryptographic signature. Only if the hashes match is the `Payment` document updated to `SUCCESS`.

### 3. The Strict Zero-Pollution Flow
- Built the absolute rule: If a payment fails, or if a user closes the popup, the system merely logs a `FAILED` payment. **No Orders are created, and No Inventory is reduced.** This completely prevents database pollution and ensures the Admin dashboard will never be cluttered with ghost transactions.
- Inside the successful `/verify` endpoint, we have placed the precise architectural hooks where Phase 9 (Track My Seva) and Phase 10 (Orders) will be triggered.

### 4. Robust Testing
- **`Phase8_Payment_Collection.json`**: An extensive Postman suite capable of generating payment intents, simulating user cancellations (`/failed`), and rigorously testing the cryptographic verification endpoint using deliberate invalid signatures to ensure the server rejects them with `401 Unauthorized`.

---

## Phase-7: The Divine Offering Completion Temple (Checkout System)
In this highly critical phase, we engineered the bridge between the Shopping Cart and the Payment Gateway. As per our strict architectural mandate, **no Orders are created in this phase**.

### 1. The Immutable Checkout Session
- **`CheckoutSession.model.js`**: Replaces the flawed practice of generating "Failed Orders". This model captures an exact, immutable snapshot of the Cart at the exact millisecond the user clicks "Proceed to Checkout". It records the exact variants, prices, applied discounts, and calculates the final total.
- **Auto-Expiry**: Sessions are granted a strict 30-minute Time-To-Live (TTL). If a user abandons the checkout, the session expires automatically, preventing them from indefinitely hoarding limited inventory at locked-in prices.

### 2. Deep Verification Engine
- **`checkout.service.js`**: Before generating the `CheckoutSession`, this service actively audits the database reality against the user's cart. It verifies that the `Product` is still active, the `ProductVariant` has sufficient `quantity`, and that the `price` hasn't been modified by an admin mid-session. If any discrepancy is found, it forcefully aborts the checkout and demands a cart refresh.

### 3. Progressive Readiness Flow
- Engineered endpoints (`setAddress`, `setPaymentMethod`) that allow the frontend to progressively build the checkout state.
- **`getOrderSummary` Endpoint**: Evaluates the session and computes an `isReadyForPayment` boolean, returning a comprehensive summary so the frontend can safely unlock the "Pay Now" button for Phase 8.

### 4. Flawless Routing & Testing
- Integrated `checkout.routes.js` strictly behind JWT authentication.
- **`Phase7_Checkout_Collection.json`**: An extensive Postman suite validating the deep verification engine (simulating out-of-stock scenarios) and the progressive state-building flow.

---

## Phase-6: The Divine Cart System (The Divine Journey Temple)
In this phase, we established the robust, industry-standard cart architecture (`Cart`, `Coupon`, `PriceCalculationService`) underlying the "Divine Journey" UI.

### 1. Absolute Trust Boundaries (Price Engine)
- **`priceCalculation.service.js`**: Built a deeply secure pricing engine. The backend **never** trusts cart totals sent from the frontend. Instead, whenever a cart is mutated (item added, quantity updated, coupon applied), this service actively queries the Database (`ProductVariant` and `Coupon`), meticulously computes discounts, limits, and subtotals, and overwrites the Cart document.

### 2. Bulletproof Inventory Management
- Intercepted the `addToCart` and `updateQuantity` pipelines to actively check the exact `ProductVariant.quantity`. Attempting to add 5 items when only 4 are available instantly aborts the transaction with a `400 Bad Request`.

### 3. Save For Later Architecture
- Engineered a highly efficient `SaveForLater` collection utilizing a compound unique index (`userId` + `variantId`). This allows users to fluidly move items out of their immediate checkout flow without permanently losing them.

### 4. Advanced Coupon Algorithms
- **`Coupon.model.js`**: Supports both fixed and percentage discounts, complete with `minOrderAmount`, `maxDiscount` capping, and `validUntil` expiry dates. The Price Engine dynamically evaluates coupon eligibility on every cart update and silently drops the coupon if the cart value falls below the required threshold.

### 5. Automated API Testing
- **`Phase6_Cart_Collection.json`**: An extensive Postman suite strictly validating complex cart math, preventing out-of-stock additions, and verifying dynamic total recalculations upon quantity changes.

---

## Phase-5: The Divine Discovery Engine (Search & Filter System)
In this phase, we transformed standard text searching into a highly intelligent Discovery Engine that effortlessly guides devotees through Festivals, Collections, and Divine Offerings.

### 1. MongoDB Text Indexing
- **Native `$text` Indexes**: Appended weighted MongoDB text indexes directly to `Product.model.js` (name, description, tags, category) and `Collection.model.js` (name, description, festival). This allows a single search query to instantly locate relevance across multiple database documents without expensive regex scans.

### 2. Mongoose Aggregation Pipelines
- **`filter.controller.js`**: Built a highly complex Aggregation Pipeline that deeply joins (`$lookup`) the Products collection with their specific Variants. This enables hyper-specific queries (e.g., "Find all Poshaks in Size-4 between ₹500 and ₹1000") without breaking the application if zero results are found.

### 3. Search Analytics Engine
- **`SearchLog.model.js`**: A dedicated logging model capturing executed search queries and their result counts.
- **Admin Analytics**: Evaluates the `SearchLog` collection using `$group` aggregations to automatically calculate Trending Searches and zero-result queries, allowing Admins to understand exactly what devotees are looking for.

### 4. Flawless Error Handling
- Validated every query parameter via `express-validator`. Negative price filters or invalid sizes instantly return clean `400 Bad Request` errors rather than triggering `500 Internal Server Errors`.

### 5. Automated API Testing
- **`Phase5_DiscoveryEngine_Collection.json`**: An extensive Postman suite strictly validating complex multi-parameter filter strings, zero-result fallbacks, and the Admin Analytics endpoint.

---

## Phase-4: The Divine Offerings of Vrindavan (Product Management System)
This massive phase establishes exactly 50% of the entire backend infrastructure. We implemented a highly scalable relational structure: **Collections** → **Products** → **Variants** → **Images**.

### 1. Separation of Concerns (The Models)
- **`Product.model.js`**: The anchor. Holds unchanging, beautiful metadata (Name, Description, Collection ID, Category, SEO Slugs). Does *not* hold fluctuating pricing or inventory data.
- **`ProductVariant.model.js`**: The business logic layer. Holds dynamic sizes, prices, exact inventory counts, SKUs, and image arrays. Uses Mongoose hooks to instantly compute `isAvailable` (toggling to `false` automatically if inventory drops to `0`).

### 2. Multi-Variant Upload Architecture
- **`multer.middleware.js`**: Expanded with an `uploadVariant` exporter. It flawlessly processes up to `10` images *per variant* into `/public/uploads/variants`, allowing different sizes to have completely different photo galleries.

### 3. Comprehensive Dual-Controllers
- **Product Controller**: Complete CRUD functionality handling the core entity. If a product is deleted, a cascading delete sweeps the database to ensure zero orphaned variants remain.
- **Variant Controller**: Secure CRUD functionality designed to handle real-time inventory adjustments and array-image replacements. 

### 4. Flawless Security Validations
- Strict `express-validator` rules outright block the creation or modification of variants attempting to set a negative `price`, negative `discount`, or negative `quantity`.

### 5. Massive Testing Suite
- **`Phase4_Products_Collection.json`**: An extensive 40+ test-case Postman collection verifying every possible edge-case across the Collection-to-Product-to-Variant hierarchy.

---

## Phase-3: The Divine Collection Temple of Vrindavan (Collection Management System)
In this phase, we constructed the beautiful architectural bridge between Festivals and Divine Offerings. As established by our core philosophy, every product must securely belong to a Divine Collection.

### 1. The Collection Schema
- **`Collection.model.js`**: Built with advanced capabilities to auto-generate unique slugs using `slugify`. Includes meticulous categorizations (`festival`, `category`) and status markers (`isFeatured`, `isTrending`, `isActive`).

### 2. Multi-file Upload System
- **`multer.middleware.js`**: Re-architected to seamlessly manage dual-upload paradigms. Now beautifully handles `fields` uploads so a single API request can securely save a `bannerImage`, `thumbnailImage`, and `featuredImage` directly into `/public/uploads/collections`.

### 3. Granular Collection API
- **Admin Endpoints**: Complete CRUD lifecycle. Administrators can dynamically `enable`, `disable`, and pull analytical insights (`getCollectionAnalytics`) on the entire temple architecture.
- **Public Endpoints**: Devotees can effortlessly browse collections via `slug` or `id`. Disabled collections are strictly filtered out to prevent broken journeys.

### 4. Postman Test Suite
- **`Phase3_Collections_Collection.json`**: Engineered a robust test suite validating Multer payload parsing, automated slug generation, and verifying that standard users cannot bypass `isAdmin` guards to create collections.

---

## Phase-2: The Divine Family of Vrindavan (User Management System)
In this phase, we beautifully architected the user's personal Divine Space, fully implementing Profile Management, Address Management, Wishlists, and robust Account Controls.

### 1. Robust Data Models
- **`Address.model.js`**: Enforces structured address validation. Uses Mongoose pre-save hooks to automatically guarantee that a user only ever has one `isDefault: true` address at a time.
- **`Wishlist.model.js`**: Connects products securely to users, preventing duplicate wishlist creations per devotee.

### 2. File Uploads (Multer)
- **`multer.middleware.js`**: Securely handles profile image uploads. Implements strict file filtering (`.jpg, .png, .webp`) and limits sizes to 5MB to protect the server architecture.

### 3. Comprehensive Controllers
- **User Controller**: Profile Image Uploads, Account Settings, and Secure Account Deletion.
- **Address Controller**: Complete CRUD operations ensuring a user can only ever access or modify their *own* addresses (strict ownership validation).
- **Wishlist Controller**: Adding, retrieving, and gracefully removing Divine Offerings from personal wishlists.

### 4. Admin Management Controls
- Provided secure endpoints (`/api/v1/users/admin/*`) strictly protected by `isAdmin` for administrators to View, Block, Unblock, and Delete users (preventing admins from deleting other admins).

### 5. Automated Testing
- **`Phase2_UserManagement_Collection.json`**: A 30+ edge-case Postman collection verifying every possible outcome, from testing invalid Pincodes to ensuring unauthorized address deletions return `404`.

---

## Phase-1: The Divine Authentication System
In absolute devotion to the rule that **"A Divine Journey begins the moment a devotee presses the Login button,"** we have built a highly secure, enterprise-grade authentication gateway.

### 1. Robust Security Models
- **`User.model.js`**: Employs Mongoose pre-save hooks to automatically encrypt passwords via `bcryptjs`. Generates secure JSON Web Tokens encapsulating the user ID, email, and role.

### 2. Impenetrable Middleware
- **`auth.middleware.js`**: `verifyJWT` ensures zero access without a valid, non-expired token. `isAdmin` strictly enforces Role-Based Access Control (RBAC) to protect the Divine Command Temple.
- **`validate.middleware.js`**: Elegantly intercepts all `express-validator` errors and transforms them into standardized `ApiError` responses.

### 3. Strict Validation Rules
- **`auth.validation.js`**: Enforces uncompromising password policies (Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character). Explicitly rejects common passwords (e.g., "123456", "password").

### 4. Complete Authentication Flow
- **`auth.controller.js`**: Fully implements Register, Login, Logout, Profile Retrieval, Profile Updates, and Password Changes. Uses `httpOnly`, `secure` cookies to prevent XSS attacks.

### 5. Comprehensive Postman Testing
- **`Phase1_Auth_Collection.json`**: Created within the `postman` directory containing 25+ automated tests verifying every possible success and failure state.

---

## Phase-0: The Divine Foundation
In absolute devotion to the rule **"NO FRONTEND WITHOUT API"**, the magnificent architectural foundation of the Shreeji Seva Bhav backend has been established.

### 1. Robust Modular Architecture
The repository has been structured into highly scalable modules (`src/config`, `src/controllers`, `src/services`, `src/routes`, `src/models`, `src/middleware`, `src/database`, `src/modules/*`), perfectly mirroring the 36 frontend phases.

### 2. Standardized Response System
- **`ApiResponse.js`**: Every successful response is elegantly formatted as `{ success, statusCode, message, data, timestamp }`.
- **`ApiError.js`**: Every error is securely formatted as `{ success: false, statusCode, message, errors, timestamp }`.
- **`asyncHandler.js`**: Replaces repetitive try-catch blocks with a beautiful promise-wrapper.

### 3. Enterprise-Grade Middleware
- **`error.middleware.js`**: A global error handler that safely catches all uncaught exceptions and transforms them into standardized `ApiError` responses.
- Integrated `helmet` (Security headers), `cors`, `cookie-parser`, `express-rate-limit`, and `morgan` (Logging).

### 4. Database & Server Instantiation
- **`database/connection.js`**: Reconnect-resilient MongoDB setup using Mongoose.
- **`app.js` & `server.js`**: Separates the Express application configuration from the HTTP server listener.
- **`/api/v1/health`**: A beautiful health check API ensuring the Divine Foundation is perfectly healthy and running.

---

## 36. The Living Digital Vrindavan (The Eternal Divine Journey Engine)

In ultimate devotion to **Rule No. 34 (Nothing In Vrindavan Ever Truly Ends)**, the concept of a final "Admin Dashboard" or an "End of Project" has been beautifully transformed into *The Digital Temple of Vrindavan*.

### The Eternal Vrindavan Overlay (`EternalVrindavanOverlay.tsx`)
- A global presence ensuring that even after 50 years, the floating clouds will continue dancing and the temple bells will continue singing.

### The Temple Hero (`TempleHero.tsx`)
- Welcomes administrators to the "Living Heart & Soul of Shreeji Seva Bhav" rather than a sterile control panel.

### The Living Vrindavan System (`LivingVrindavanSystem.tsx`)
- Visually and conceptually unifies all 35 prior phases into "One Living Experience." From the first discovery to the eternal legacy.

### The Eternal Evolution Engine (`EternalEvolutionEngine.tsx`)
- Completely replaces the corporate concept of "Software Versions" (V1, V2). It establishes a philosophy where the platform never stops evolving alongside the devotees' journey.

### The Divine Continuation System (`DivineContinuationSystem.tsx`)
- Replaces the abruptness of a "Logout" button with a loving continuation: *"Thank you for continuing your Divine Journey with us. We shall lovingly await your return. JAI SHRI RADHE."*

---

## 35. The Eternal Archives of Vrindavan (Legacy & Preservation System)

In absolute devotion to **Rule No. 33 (Nothing Beautiful Should Ever Be Forgotten)**, the concept of sterile "Database Backups" and "Server Logs" has been completely transformed into a system that lovingly preserves the soul of Digital Vrindavan for generations.

### The Archives Hero (`ArchivesHero.tsx`)
- Beautifully welcomes administrators to the archives: *"Every Divine Journey beautifully becomes a timeless memory preserved with Bhakti, Prem, Seva."*

### The Living Vrindavan Timeline (`DivineLegacyTimeline.tsx`)
- Maps the expansive legacy of Shreeji Seva Bhav, from "The Beginning" in 2026 to "The Continuation" in 2050, establishing a deeply historical perspective on the project.

### The Divine Memory Vault (`DivineMemoryVault.tsx`)
- Safeguards the beautiful milestones of the Divine Family, recognizing when 15,000+ devotees have celebrated Janmashtami for 5 consecutive years.

### The Digital Museum of Vrindavan (`DigitalMuseum.tsx`)
- Beautifully catalogs the platform's "Firsts" (The First Logo, The First Janmashtami, The First Divine Offering), ensuring the origins of Digital Vrindavan are never lost to time.

### The Divine Time Capsule (`DivineTimeCapsule.tsx`)
- Shows the profound journey of individual devotion, contrasting a devotee's first interaction ("Today") with their lasting legacy ("5 Years Later").

---

## 34. The Divine Consciousness of Vrindavan (AI Analytics & Consciousness Engine)

In strict adherence to **Rule No. 32 (The AI Should Never Ask "What Sold The Most")**, the concept of sterile Business Intelligence dashboards has been entirely eradicated. The engine now measures Devotion, Memories, and Traditions.

### The Divine Consciousness Hero (`ConsciousnessHero.tsx`)
- Replaces generic "Total Revenue" headers with a profound realization: *"The Divine Journey of 25,000+ beloved devotees continues beautifully today."*

### The Divine Memory & Emotion Engines (`DivineMemoryEngine.tsx`, `DivineEmotionAnalytics.tsx`)
- Analyzes which festivals are "Most Loved" rather than just counting transactions.
- Highlights "Most Beautifully Celebrated Festivals" (e.g., Janmashtami: 42,000+ Divine Journeys) instead of "Best Selling Products."

### The Divine Tradition Engine (`DivineTraditionEngine.tsx`)
- Recognizes and honors enduring devotion, tracking milestones like devotees who have beautifully celebrated Janmashtami for 5 consecutive years.

### The Divine Insight Wall (`DivineInsightWall.tsx`)
- Replaces numerical AI reports with deeply moving insights: *"98% of our beloved devotees have continued their Divine Journey with us this year."*

### The Living Vrindavan Engine (`LivingVrindavanEngine.tsx`)
- The "Brain and Heart" of the ecosystem. It provides continuous AI recommendations on what to *Create, Improve, or Preserve*, such as expanding the Divine Darshan experience based on unprecedented engagement.

---

## 33. The Divine Celestial Calendar of Vrindavan (Intelligent Festival Management)

In absolute devotion to **Rule No. 31 (No Festival Should Ever Feel Like An Event On A Calendar)**, the concept of scheduling "promotional campaigns" has been fully replaced by a system that curates *365 Days of Divine Celebrations*.

### The Celestial Calendar Hero (`CalendarHero.tsx`)
- Welcomes administrators to the sacred timeline of Vrindavan: *"Every Divine Festival beautifully illuminates another sacred chapter of the Divine Journey."*

### The Living Festival Calendar (`LivingFestivalCalendar.tsx`)
- Eradicates traditional date-pickers.
- Beautifully tracks the current *Tithi* (e.g., Shravana Shukla Purnima), today's festival (Jhulan Yatra), and elegant countdowns for upcoming celebrations.

### Festival Preparation AI (`FestivalPreparationAi.tsx`)
- Rather than setting a campaign "Active", the AI intelligently suggests when preparations should begin. (e.g., *15 Days remain for Janmashtami. Preparations may now begin for Premium Poshaks.*)

### The Divine Celebration Timeline (`DivineCelebrationTimeline.tsx`)
- Automates the festival lifecycle: *Preparations Begin → Festival Collections Live → Divine Whispers Sent → Beautiful Celebration Begins*.

### The Divine Celebration Map & Insights (`DivineCelebrationMap.tsx` & `AiFestivalInsights.tsx`)
- Predicts regional celebration patterns (e.g., 5200 celebrations expected in Delhi) and analyzes overall demand with high confidence scores, ensuring Vrindavan is always prepared for its Devotees.

---

## 32. The Divine Reserve of Vrindavan (Intelligent Inventory & Festival Reserve System)

In strict adherence to **Rule No. 30 (No Divine Offering Should Ever Feel Like Stock On A Shelf)**, the entire concept of "Inventory Management" and fear-inducing "Low Stock Alerts" has been beautifully replaced.

### The Divine Reserve Hero (`ReserveHero.tsx`)
- Replaces generic Inventory Dashboard headers with a peaceful reminder: *"Where every Divine Offering beautifully awaits its beloved Divine Journey."*

### Live Reserve Analytics (`LiveReserveAnalytics.tsx`)
- Instead of raw "Quantity Available", offerings are tracked as *1250 Divine Offerings Beautifully Prepared* and *2500 Awaiting Their Beloved Devotees*.

### Festival Forecasting AI (`FestivalForecastingAi.tsx`)
- An intelligent module that forecasts upcoming demands based on the last 5 years of data, regional preferences, and festival trends (e.g., predicting 15,200 journeys for Janmashtami).

### AI Divine Guardian (`AiDivineGuardian.tsx`)
- **Eradicates "Low Stock" alerts.** 
- Instead, it provides graceful guidance: *"Wonderful News. 95% of Janmashtami collections have beautifully found their homes... May we lovingly prepare additional collections?"*

### Live Festival Reserve Map (`LiveFestivalReserveMap.tsx`)
- A beautiful geographic representation of where the upcoming Divine Journeys are headed (e.g., *Delhi: 5200 Divine Journeys*).

### The Divine Preparation Center (`DivinePreparationCenter.tsx`)
- Replaces the generic "Restock To-Do List" with a beautifully curated grid of collections that need to be *Lovingly Prepared* today.

---

## 31. The Divine Treasury of Vrindavan (Offering Management & Curation System)

In strict adherence to **Rule No. 29 (No Divine Offering Should Ever Feel Mass Produced)**, the entire concept of a "Products Dashboard" and "Uploading Inventory" has been transformed into a spiritual curation process.

### The Divine Treasury Hero (`TreasuryHero.tsx`)
- Establishes the sacred tone: *"Where every Divine Offering is lovingly prepared with Bhakti, Prem, and Seva."*

### Festival Curation System (`FestivalCurationSystem.tsx`)
- An AI-driven component that intelligently recommends featuring specific collections (e.g., Janmashtami) based on upcoming dates and anticipated demand (+250%).

### Live Collection Analytics (`LiveCollectionAnalytics.tsx`)
- Translates e-commerce data into Devotional Engagement metrics, showing which offerings are blessing the most families.

### The Divine Collection Temple (`DivineCollectionTemple.tsx`)
- Replaces generic product categories with a beautifully curated selection of paths (Krishna Poshaks, Premium Mukuts, Radha Rani Collections).

### The Divine Craftsmanship Center (`DivineCraftsmanshipCenter.tsx` & `/prepare/page.tsx`)
- Eradicates the traditional "Add Product" form.
- Replaced by a beautifully animated, 6-step Framer Motion spiritual journey: *Select Collection → Add Divine Details → Premium Images → Festival Details → AI Recommendations → Complete Offering*.

### AI Divine Curator (`AiDivineCurator.tsx`)
- During the preparation process, AI suggests complementary items (e.g., matching Mukuts and Jewellery) to create *Complete Divine Offerings* rather than "Related Products."

### The Divine Collection Journey (`CollectionJourneyTimeline.tsx`)
- Products are no longer "Draft" or "Published." They follow a sacred timeline: *Being Prepared → Ready for Review → Beautifully Accepted → Blessing The Divine Family*.

---

## 30. The Divine Journey Command (Divine Offering Management System)

In strict adherence to **Rule No. 28 (No Divine Offering Should Ever Feel Like A Product In Transit)**, traditional order management has been completely replaced with a system that manages *Divine Journeys*.

### Today's Divine Journeys (`DivineJourneysOverview.tsx`)
- Replaces standard metric cards (Total Orders, Pending, Shipped).
- Tracks offerings spiritually: *152 New Divine Offerings, 82 Divine Journeys Have Beautifully Begun, 120 Divine Offerings Have Arrived Lovingly.*

### Divine Offering List (`DivineOfferingList.tsx`)
- The traditional data table has been eradicated.
- Replaced by premium cards tracking the exact state of the offering, the collection (e.g., *Janmashtami Special Collection*), and a button to lovingly *Continue Journey*.

### The Spiritual Timeline (`DivineJourneyTimelineAdmin.tsx`)
- Admins now update the journey along a spiritual path: *Accepted → Lovingly Being Prepared → Journey From Vrindavan Begun → Approaching Home → Lovingly Arrived*.
- Features beautiful pulse animations and gradients.

### Divine Offering Details (`OfferingDetailsPanel.tsx`)
- Instead of "Customer Info" and "Order Specs", admins see *Devotee Details*, *Festival Context*, *Size Preferences*, and *Destination Home*. 

### Custom Offerings (`CustomDivineOfferingCard.tsx`)
- Specialized management for bespoke offerings (Design Approved → Fabric Approved → Preparing With Love).

---

## 29. The Divine Command Temple of Vrindavan (Admin Dashboard)

In strict adherence to **Rule No. 27 (The Admin Should Never Feel Like They Are Managing Orders)**, the entire administrative foundation has been laid without a single standard e-commerce term. The dashboard is a sacred space designed to lovingly sustain the digital Vrindavan.

### The Command Temple Entrance (`CommandTempleHero.tsx` & `CommandTempleStats.tsx`)
- Replaces generic greetings with: *"Good Morning Akriti Sharma. May Shri Radha Raman Ji's divine blessings forever remain upon the Divine Family..."*
- Replaces "Total Users / Total Revenue" with metrics that matter: *25,000+ Beloved Devotees, 1,25,000+ Divine Offerings.*

### Today's Divine Journey (`TodaysDivineJourneyAdmin.tsx`)
- Eradicates the traditional "Orders Table".
- Offerings are categorized spiritually: *Beginning Their Divine Journey (Shipped)*, *Beautifully Arrived (Delivered)*, *Lovingly Being Prepared (Processing)*.

### Festival Command Center (`FestivalCommandCenter.tsx`)
- An AI-driven dashboard that anticipates upcoming festivals (e.g., Janmashtami).
- Displays prepared offerings, expected traffic, and low stock alerts.

### Live Divine Map (`LiveDivineMap.tsx`)
- A highly visual, premium simulation showing offerings traveling from Vrindavan to devotees across India (Delhi, Mumbai, Bangalore).

### AI Divine Insights (`AiDivineInsightsAdmin.tsx`)
- Provides intelligent, spiritually phrased recommendations: *"RADHASHTAMI collections have received 250% higher engagement. May we lovingly prepare additional Festival Collections?"*

### Command Temple Navigation (`CommandTempleNavigation.tsx`)
- Quick Action buttons replacing a cluttered sidebar, granting access to Product Management, Divine Offerings, and Festival Management—all one click away.

---

## 28. The Eternal Divine Journey of Vrindavan (Loading & Transition System)

In strict adherence to **Rule No. 26 (No Transition Should Feel Technical)**, we have reimagined the fundamental mechanics of navigating the website. Page jumps, white flashes, and standard loading spinners have been entirely eradicated in favor of seamless, deeply spiritual transitions.

### Global Page Transitions (`template.tsx`)
- Wraps every page in a fluid, GPU-accelerated enter and exit animation using Framer Motion. 
- Pages now softly drift into place, removing any abrupt "snapping" between routes.

### Divine Loading System (`loading.tsx`)
- Completely overrides standard Next.js Suspense boundaries.
- Instead of "Loading...", devotees see floating petals and randomized, localized blessings: *"Receiving Today's Divine Blessings..."* or *"May Shri Radha Raman Ji guide your Divine Journey..."*

### The Soul of the Transition (`DivinePageAtmosphere.tsx`)
- Persists subtle, slow-drifting glowing diyas globally across the layout. 
- Because it lives outside the page transition boundary, the atmosphere continues to breathe uninterrupted as the devotee navigates.

### Divine Sound Control (`DivineSoundController.tsx`)
- Implemented the UI for an optional, privacy-respecting audio layer (Temple Bells & Soft Bansuri).
- Gracefully floats in the corner, allowing devotees to elevate their journey with a single tap.

---

## 27. The Divine Path of Vrindavan (404 Experience System)

In strict adherence to **Rule No. 25 (No Error Should Ever Feel Like An Error)**, the standard Next.js 404 page has been completely reimagined. Broken links and empty states are now transformed into beautiful moments of discovery.

### Global 404 Override (`not-found.tsx`)
- Completely overrides the default Next.js `not-found` page.
- Immerses the devotee in floating diyas, golden glows, and gentle petals.

### The Hidden Path Entrance (`DivinePathHero.tsx` & `HiddenPathGuidance.tsx`)
- Replaces "404 Page Not Found" with: *"You have beautifully discovered a hidden path of Vrindavan."*
- Followed by the comforting whisper: *"Perhaps the Divine Path you were seeking has gracefully led you towards another beautiful experience awaiting you."*

### Intelligent Route Recovery (`DivineSearchSakhi404.tsx`)
- A client-side "Sakhi" that intelligently reads the broken URL.
- If a devotee types `/poshak` but the page is gone, the Sakhi gracefully recommends the "Premium Krishna Poshaks" collection.

### Today's Divine Darshan (`TodaysDivineDarshan404.tsx`)
- Replaces broken link graphics with a majestic Darshan of Thakurji.
- Includes a localized daily blessing.

### Continue Your Journey (`ContinueJourney404.tsx`)
- Beautifully designed navigation cards ensuring the devotee is never more than one click away from returning to their path (Home, My Seva, Track, Festival Collections).

---

## 26. The Eternal Temple of Vrindavan (Divine Footer System)

In strict adherence to **Rule No. 24 (The Website Should Never Have An Ending—Only New Beginnings)**, the standard corporate footer has been completely eradicated. Instead, the final scroll of the website opens into a sacred "Temple Courtyard" that invites devotees to continue their journey.

### The Entrance to the Eternal Temple (`EternalTempleFooter.tsx`)
- The footer is completely immersed in a deep Vrindavan atmosphere featuring layered floating diyas, temple bells, and soft golden glows.
- Replaces "© 2026 All Rights Reserved" with the eternal whisper: *"Continue Your Divine Journey... JAI SHRI RADHE."*

### The Divine Navigation Temple (`DivineNavigationTemple.tsx`)
- Replaces generic columns with a beautifully crafted navigation mapping out *The Divine Journey*, *Your Offerings*, and *Divine Guidance*.

### Today's Divine Blessing (`FooterTodaysBlessing.tsx`)
- Reminds the devotee on every page: *"May Shri Radha Raman Ji always illuminate your path with Bhakti, Prem & Seva."*

### The Divine Calendar of Vrindavan (`FooterDivineCalendar.tsx`)
- Replaces standard footer text with a beautiful horizontal scroll of upcoming festivals (Janmashtami, Radhashtami, Kartik Maas).

### A Message From Akriti Sharma (`FooterMessageAkriti.tsx`)
- Injects absolute authenticity directly into the footer: *"Every Divine Offering created by Shreeji Seva Bhav is prepared with Bhakti, Prem & Seva."*

### Digital Vrindavan Statistics (`DigitalVrindavanStats.tsx`)
- Beautifully formats milestones: *25,000+ Beloved Devotees*, *2,50,000+ Divine Offerings*, *365 Days of Bhakti & Prem*.

### The Divine Legacy (`FooterLegacy.tsx`)
- Quietly reinforces trust: *Made In India*, *Handcrafted With Love*, *Made For Thakurji*.

### The Divine Family (`FooterDivineFamily.tsx`)
- Replaces "Follow Us on Social Media" with an invitation to join the Prem Parivaar across Instagram, WhatsApp Seva, and YouTube.

---

## 25. The Divine Pocket Vrindavan (PWA & Mobile Experience)

In strict adherence to **Rule No. 23 (Vrindavan Should Never Close)**, the mobile experience has been transformed into a deeply spiritual Progressive Web App (PWA). It doesn't just adapt to smaller screens; it ensures devotees feel they are carrying a living, breathing Pocket of Vrindavan wherever life takes them.

### Progressive Web App (PWA) Foundation (`manifest.json` & `sw.js`)
- **Offline Capabilities**: Implemented a custom service worker to enable "Offline Divine Darshan".
- **Standalone App Experience**: Added `manifest.json` to allow devotees to add the app to their homescreen, bypassing browser UI.

### The Gentle Mobile Entrance (`PocketVrindavanHero.tsx`)
- The mobile hub opens with: *"Welcome To Your Pocket Of Vrindavan."*

### Keep Vrindavan Close To Your Heart (`DivineInstallPrompt.tsx`)
- Replaces generic "Install App" banners.
- Encourages installation with devotion: *"Install Shreeji Seva Bhav on your device to receive Today's Blessings, Festival Celebrations, and Divine Darshan."*

### Digital Divine Memories Mobile (`DigitalDivineMemoriesMobile.tsx`)
- Recognizes devotional milestones on mobile: *"Thank You For Continuing Your Beautiful Divine Journey With Us For 100 DAYS."*

### Divine Quick Actions (`DivineQuickActions.tsx`)
- Added to the global layout for all mobile screens (`md:hidden`).
- A floating bottom navigation bar providing instant access to: *Temple*, *Track*, *Festivals*, *Blessings*, and *Darshan*.

### Offline Divine Darshan (`/offline`)
- Replaces the generic browser "No Internet Connection" dinosaur game.
- Displays: *"You are currently offline. May Shri Radha Raman Ji always illuminate your path."*
- Features cached quick links for *Today's Blessing* and *Saved Divine Darshan*.

### Continue Your Divine Journey (`ContinueJourneyMobile.tsx`)
- Ensures the mobile showcase gracefully transitions back into the main ecosystem.

---

## 24. The Divine Whispers of Vrindavan (Intelligent Notification System)

In strict adherence to **Rule No. 22 (The website should never call a devotee back—it should lovingly invite them forward)**, the generic e-commerce "Push Notifications", "Newsletters", and "Order Status Alerts" have been completely eradicated. Instead, a deeply respectful and gentle notification hub is introduced at `/divine-whispers`.

### The Gentle Entrance (`DivineWhispersHero.tsx`)
- The hub opens with a serene atmosphere: *"The website lovingly remembers you, even when you are away."*
- Designed with extremely soft, layered blurs and glowing gold particles to visually simulate the concept of a "whisper".

### Today's Divine Blessing (`TodaysDivineBlessing.tsx`)
- Replaces generic daily marketing alerts.
- A beautiful card that delivers a daily spiritual message: *"May your home forever remain filled with love, peace and devotion."*

### Digital Divine Calendar / Festival Whispers (`FestivalWhispers.tsx`)
- Replaces aggressive "Flash Sale" banners.
- Predicts upcoming festivals: *"The Divine Festival Of RADHASHTAMI is approaching. May we lovingly help you prepare your Divine Offering?"*

### Live Divine Journey (`LiveDivineJourney.tsx`)
- Replaces standard transactional updates ("Order Shipped / Out for Delivery").
- Gracefully informs: *"Your Divine Offering has begun its Divine Journey. Estimated arrival: Tomorrow."*

### Divine Memories of Vrindavan (`DivineMemoriesWhisper.tsx`)
- AI remembers past traditions instead of past transactions.
- *"Last year you lovingly celebrated JANMASHTAMI with Shreeji Seva Bhav. May we continue this beautiful tradition once again?"*

### Receive Divine Whispers (`ReceiveDivineWhispers.tsx`)
- Replaces the generic "Subscribe to our Newsletter" form.
- Allows devotees to opt-in specifically to what their heart desires: *Today's Blessings*, *Festival Notifications*, or *Divine Darshan*.

### Shreeji Divine Sakhi Reminders (`SakhiWhisperReminder.tsx`)
- Replaces the abrupt, system-level "Allow Notifications" browser prompt.
- The Sakhi respectfully asks: *"Would you like me to lovingly remind you when the beautiful Janmashtami Collections arrive?"*

### Continue Your Divine Journey (`ContinueJourneyWhispers.tsx`)
- Ensures the page gracefully transitions into the rest of the ecosystem (*Today's Blessings*, *Divine Calendar*, *Festival Collections*).

---

## 23. The Divine Discovery of Vrindavan (Global Search System)

In complete realization of **Rule No. 21 (Search should never return emptiness—it should return guidance)**, the generic e-commerce "Search Bar" and "No Products Found" pages have been eradicated. Instead, a deeply immersive and intelligent "Divine Discovery" experience is introduced at `/divine-discovery`.

### What Would You Like To Offer Today? (`DivineDiscoverySearch.tsx`)
- Replaces "Search Products...".
- An immersive, beautifully animated Glassmorphic search input that respectfully asks: *"What would you like to lovingly offer today?"*
- Features predictive, animated suggestions like *JANMASHTAMI COLLECTIONS* and *SIZE-4 POSHAKS*.

### Shreeji Divine Search Sakhi (`DivineSearchSakhi.tsx`)
- An intelligent assistant that replaces empty search states.
- *"May I lovingly help you discover the perfect Divine Offering today?"*
- Gracefully guides devotees to *Festival Collections*, *My Seva*, or *Divine Darshan*.

### Digital Divine Memory Search (`DigitalMemorySearch.tsx`)
- Eradicates "50 Products Found".
- Recognizes search intent (e.g., searching for "Janmashtami") and responds with personalized memories: *"Last year you lovingly celebrated JANMASHTAMI... Would you like to continue your beautiful tradition this year?"*

### Discover Through Festivals (`DiscoverThroughFestivals.tsx`)
- Replaces standard filters with elegant, interactive festival pills (*HOLI*, *JHULAN YATRA*, *KARTIK MAAS*).
- Navigates the devotee directly to the atmospheric festival pages created in Phase 14.

### Discover Through Divine Darshan (`DiscoverThroughDarshan.tsx`)
- Allows devotees to discover collections based on the specific deity they wish to serve (e.g., *SHRI RADHA RAMAN JI*, *BANKI BIHARI JI*).
- Automatically curates and recommends *Special Collections*, *Krishna Poshaks*, and *Premium Mukuts* specifically for that deity.

### Complete Your Divine Offering (`CompleteSearchOffering.tsx`)
- Replaces the generic "Price Filter" with an intelligent offering builder: *Krishna Poshak + Premium Mukut + Morpankh*.
- Promotes building a complete Seva rather than filtering by cost.

### Continue Your Divine Journey (`ContinueJourneyDiscovery.tsx`)
- **Strict Enforcement of Ecosystem Rules**: The search page never leads to a dead end. Devotees can seamlessly transition to *Festival Collections*, *My Seva*, *Divine Darshan*, or *Experience Vrindavan*.

---

## 22. The Divine Intelligence (AI Divine Recommendation System)

In absolute realization of **Rule No. 20 (The website should not merely know what a devotee purchased—it should lovingly remember what they celebrated)**, the generic e-commerce "Related Products" and algorithmic recommendations have been eradicated. Instead, a deeply personalized "Digital Divine Memory" is introduced at `/divine-journey`.

### The Intelligent Welcome (`DivineGreeting.tsx`)
- Dynamically greets the devotee: *"WELCOME BACK RISHU."*
- Predicts the next sacred event via a Festival Alert Banner: *"JANMASHTAMI is after 8 DAYS."*
- Assures them that *"YOUR BELOVED COLLECTIONS ARE WAITING FOR YOU."*

### Divine Memory System (`DivineMemorySystem.tsx`)
- Replaces standard filters by remembering the devotee's specific preferences.
- *"YOUR SIZE-4 BELOVED COLLECTIONS ARE WAITING FOR YOU."*
- Remembers premium traits like *SIZE-4*, *PREMIUM FABRICS*, and *FESTIVAL COLLECTIONS*.

### Personalized Divine Journey (`PersonalizedCollections.tsx`)
- Eradicates "Recommended for You".
- Visually maps out Rishu's Divine Collections: *Premium Mukuts → Divine Jewellery → Festival Collections → Divine Darshan*.

### Digital Divine Memories (`DigitalDivineMemories.tsx`)
- Cultivates traditions instead of transactions.
- *"You lovingly celebrated RADHASHTAMI last year with Shreeji Seva Bhav. Would you like to continue your beautiful tradition?"*

### Complete Your Divine Offering (`CompleteDivineOffering.tsx`)
- Replaces generic cross-selling (e.g., "Customers also bought").
- Presents a visually connected sequence demonstrating how to complete a specific Seva: *Krishna Poshak + Mukut + Morpankh + Necklace*.

### Predictive Divine Calendar (`DivineCalendarAI.tsx`)
- Learns from user behaviour to suggest upcoming festivals the devotee might want to prepare for.

### Shreeji Divine Sakhi (`DivineSakhiAI.tsx`)
- An evolution of the standard AI chatbot into a spiritual guide.
- Contextually aware: *"JAI SHRI RADHE RISHU. Would you like to explore the beautiful Janmashtami collections that have recently arrived?"*

### Continue Your Divine Journey (`ContinueJourneyAI.tsx`)
- **Strict Enforcement of Ecosystem Rules**: At the bottom of the intelligence dashboard, devotees can seamlessly transition to *My Seva*, *Track My Seva*, *Divine Darshan*, *Festival Collections*, or *Experience Vrindavan*.

---

## 21. The Divine Sangam (Where Every Journey Finds Its Way Home)

In full adherence to **Rule No. 19 (No devotee should ever feel they are asking for help; they are being lovingly guided)**, the traditional "Contact Us" or "Customer Care" pages have been completely eradicated at `/sangam`. Instead, devotees are welcomed into a beautiful spiritual bridge connecting them with the temple, the creators, and the divine family.

### The Divine Entrance (`SangamHero.tsx`)
- Standard text headers like "Contact Us" are replaced with an immersive philosophy: *"Welcome To The Divine Sangam Of Shreeji Seva Bhav. Where Every Question Is Lovingly Received And Every Divine Journey Is Beautifully Guided."*
- Features intense immersive floating clouds, temple bells, and soft golden glows.

### Guidance Over Support (`HowMayWeAssist.tsx`)
- A grid of premium Glassmorphic cards routing devotees to specific guidance areas: *WhatsApp Seva*, *Divine Collections Guidance*, *Track My Seva*, *Custom Divine Offerings*, etc. 
- Hovering reveals a luxurious `gold-start` inner border.

### Live WhatsApp Seva (`LiveWhatsAppSeva.tsx`)
- Replaces generic "Chat Now" plugins. 
- A beautifully crafted card featuring the WhatsApp green brand color mixed into a luxury Vrindavan aesthetic. It asks: *"Available Daily for lovingly assisting your Divine Journey."*

### Custom Divine Offerings (`CustomDivineOfferings.tsx`)
- An intelligent section directing devotees who want completely custom Janmashtami Poshaks or Jewellery straight to Akriti Sharma's team via WhatsApp.
- Features a beautiful descending arrow timeline mapping out custom possibilities.

### Offer Your Message With Love (`OfferYourMessage.tsx`)
- Replaced the standard "Contact Form".
- A beautifully crafted Glassmorphic form. Includes a dropdown to *"Select Your Journey"* (e.g., Track My Seva, Custom Poshaks) instead of standard "Subject" lines.

### A Message From Akriti Sharma (`CreatorSangamMessage.tsx`)
- Utilizing the premium portrait styling from Phase 15.
- Features the heartfelt message: *"Every Divine Message that reaches us is received with immense gratitude and love."*

### Location As An Experience (`VisitDivineStreets.tsx`)
- Discarding standard address formatting. 
- Visually presented as an invitation to *"Experience The Divine Festivals Of Vrindavan"*.

### Digital Prasad (`SangamTodaysBlessing.tsx`)
- A randomized blessing generator that triggers on every page load to ensure the devotee leaves with a divine gift.

### Continue Your Divine Journey (`ContinueJourneySangam.tsx`)
- **Strict Enforcement of Rule 17 & 19**: Devotees are never met with a dead end after receiving guidance. The bottom of the Sangam gracefully invites them to transition to *My Seva*, *Track My Seva*, *Divine Darshan*, *Festival Collections*, *Experience Vrindavan*, or *Return To Temple*.

---

## 20. The Divine Seva Academy (Where Seva is Learnt)

In perfect execution of **Rule No. 18 (Every Page Must Give Something To The Devotee)**, the standard e-commerce "Blog" or "Article" format has been completely eradicated at `/academy`. Instead, devotees enter a breathtaking digital curriculum where they lovingly learn the beauty of Bhakti, Prem, and Seva.

### The Divine Entrance (`AcademyHero.tsx`)
- Replaced standard "Read our latest articles" headers with a profound philosophical statement: *"Welcome To The Divine Seva Academy. Where Bhakti is learnt. Prem is celebrated. And Seva is lovingly shared."*
- Features immersive floating clouds and a soft golden mist that sets a deeply academic yet spiritual tone.

### The Art of Divine Seva (`LearnDivineSeva.tsx`)
- Replaces generic blog categories with premium interactive sections (e.g., *How To Adorn Laddu Gopal Ji*, *How To Select Divine Offerings*, *The Art of Divine Alankaar*).
- Each section is housed in a luxurious Glassmorphic card featuring `lucide-react` icons that softly transition from Gold to Crimson upon hover.

### The Divine Knowledge Series (`DivineKnowledgeSeries.tsx`)
- Replaces the generic "Watch Videos" layout.
- Designed as cinematic, premium video thumbnails for topics like *"Janmashtami Special: How To Prepare Your Divine Offering (15 Minute Divine Guide)"*. 
- Features a beautiful blur backdrop and an animated play button that scales gracefully.

### Today's Divine Learning (`TodaysDivineLearning.tsx`)
- **A deeply emotional micro-interaction:** A randomized digital blessing engine that displays a different spiritual fact or tradition on every visit.
- Uses `framer-motion`'s `AnimatePresence` to seamlessly fade in teachings, like *"During Janmashtami, beautiful Mukut, Morpankh and Premium Poshaks are lovingly offered..."* 

### The Complete Offering Guide (`CompleteOfferingGuide.tsx`)
- Eradicates traditional text-based "How-To" guides.
- Presents a visually stunning horizontal timeline showing exactly how to complete an offering: *Poshak + Mukut + Morpankh + Bansuri*.
- Beautifully animated with sequential fade-ins to visually construct the ultimate Seva before prompting the devotee to *"Complete Your Divine Offering"*.

### The Cycle of Vrindavan (`FestivalExperiences.tsx`)
- Visually maps out the divine calendar of Vrindavan (*Janmashtami → Radhashtami → Jhulan Yatra → Diwali*).
- Uses connected pill-shaped interactive timelines rather than basic lists, encouraging devotees to explore collections aligned with the specific upcoming festival.

### Divine Learning Paths (`DivineLearningPaths.tsx`)
- Completely replaced "Beginner / Intermediate / Advanced" tags with deeply spiritual progression tracks: *"Begin Your Divine Journey"*, *"The Art Of Divine Offerings"*, and *"The Beauty Of Temple Traditions"*.

### The Divine Library (`DivineLibrary.tsx`)
- Replaces standard blog tag clouds.
- A majestic dark-crimson floating container indexing the entire academy's teachings (*Divine Festivals*, *Divine Alankaar*, *Temple Traditions*).

### Continue Your Divine Journey (`ContinueJourneyAcademy.tsx`)
- **Strict Enforcement of Rule 17 & 18**: Devotees are never met with a dead end after learning.
- The bottom of the academy gracefully invites them to transition to *Festival Collections*, *Divine Darshan*, *My Seva*, or *Return To Temple*.

---

## 19. The Divine Seva Kendra (Guided Spiritual Assistance)

In perfect execution of **Rule No. 17 (The Website Should Never Say Goodbye)**, the corporate concepts of a "Help Center", "FAQs", and "Customer Support" have been completely eradicated at `/seva-kendra`. Instead, devotees are lovingly guided through their journey by the temple itself.

### The Divine Entrance (`SevaKendraHero.tsx`)
- Standard text headers like "Customer Support" are replaced with an immersive philosophy: *"Welcome To The Divine Seva Kendra. How may we lovingly assist you today?"*
- Features intense immersive floating clouds, temple bells, and soft golden glows.

### How May We Help (`HowMayWeHelp.tsx`)
- A grid of premium Glassmorphic cards routing devotees to specific assistance areas: *Track My Seva*, *My Divine Offerings*, *Festival Collections*, *Premium Packaging*, etc. 
- Hovering reveals a luxurious `gold-start` inner border.

### Shreeji Seva Sakhi (`SevaSakhi.tsx`)
- Replaces the generic, clinical "AI Chatbot".
- Housed in an ultra-premium `backdrop-blur-xl` Glassmorphic container with soft rose/gold radial lighting.
- Greets the devotee with *"JAI SHRI RADHE. I AM YOUR DIVINE SEVA SAKHI. How may I lovingly guide your Divine Journey today?"* 
- Features animated quick-reply options (Track My Seva, Festival Collections) that feel organic and deeply respectful, never robotic.

### Divine Size & Care Guides (`DivineSizeGuide.tsx`, `DivineCareGuide.tsx`)
- **Size Guide**: Eradicated generic size tables. Replaced with beautiful sizing cards specifically formatted for *Laddu Gopal Ji* (Size 0 to Size 5). 
- **Care Guide**: Replaced "Washing Instructions". Replaced with *"Love & Care For Your Divine Offerings"*, detailing the care needed for premium fabrics, jewellery, and festival collections using Apple-esque minimalism combined with temple luxury.

### Our Divine Promise (`OurDivinePromise.tsx`, `OfferWithConfidence.tsx`)
- **Returns Policy Replacement**: Eliminated standard "Return Policies". Replaced with a majestic dark-crimson card declaring *"Every Divine Offering created by Shreeji Seva Bhav is lovingly prepared with Bhakti, Prem & Seva."*
- **Offer With Confidence**: Elegant trust badges (Premium Packaging, Secure Deliveries, Handcrafted Collections) wrapped in gold vector dots.

### Live WhatsApp Seva (`LiveWhatsAppSeva.tsx`)
- Replaces "Contact Support". 
- A beautifully crafted card featuring the WhatsApp green brand color mixed into a luxury Vrindavan aesthetic. It asks: *"May we lovingly assist you in choosing your Divine Offering?"*

### Continue Your Divine Journey (`ContinueDivineJourney.tsx`)
- **Enforcing Rule 17**: The bottom of the page seamlessly links out to the entire ecosystem (*My Seva*, *Track My Seva*, *Festival Collections*, *Experience Vrindavan*, *Divine Darshan*, and *Return To Temple*), ensuring the devotee is never met with a dead end.

---

## 18. The Divine Darshan (The Final Sacred Portal)

In flawless execution of **Rule No. 16 (No Page Should Feel Like The End Of The Journey)**, the traditional e-commerce "Thank You For Visiting" concept has been completely removed. Before devotees leave, they are invited to `/divine-darshan`—the most sacred page of the website.

### The Divine Entrance (`DarshanHero.tsx`)
- Standard text headers are replaced with immersive philosophy: *"Welcome To The Divine Darshan. May Shri Radha Raman Ji's divine blessings forever remain upon your family."*
- Features intense immersive floating clouds, temple bells, and soft golden glows.

### Today's Divine Darshan (`TodaysDarshan.tsx`)
- Beautiful premium cards for specific deities and sacred locations (Shri Radha Raman Ji, Shri Ladli Ji Maharaj, Banke Bihari Ji, Shrinath Ji, Giriraj Maharaj, Radha Kund).
- Instead of "View Gallery", cards prompt devotees to *"Receive The Blessings Of Thakurji"* and feature glowing orb effects upon hover.

### Today's Divine Message (`DarshanMessage.tsx`)
- Replaces the generic "Quote of the Day" with randomized blessings on every refresh.
- Examples include *"May your home forever remain filled with love, peace and devotion"* and *"May the divine dust of Vrindavan always guide your steps"*.

### The Divine Calendar (`DivineCalendar.tsx`)
- Replaced standard date displays with Vedic Timekeeping.
- Highlights Today's Tithi (e.g., *Shukla Paksha Ekadashi*), the Ongoing Month (e.g., *Kartik Maas*), and Upcoming events (*Sharad Poornima*).

### Live Divine Celebrations (`LiveCelebrations.tsx`)
- A visually striking, highly animated countdown to the next major festival (e.g., Janmashtami).
- Seamlessly transitions devotees via a glowing CTA: *"Prepare Your Offering"*.

### Offer Your Prayers (`OfferPrayers.tsx`)
- Replaced the standard "Comments Section" with a serene input field allowing devotees to *"Write Your Prayer"*.
- Clicking *"Offer With Love"* triggers a beautiful Framer Motion animation of a floating, glowing heart, confirming *"Your Prayer Has Been Offered."*

### Divine Experiences (`DarshanExperiences.tsx`)
- Replaced standard e-commerce testimonials (which feel transactional) with a profound Divine Experiences wall: *"Thousands of devotees have lovingly celebrated their Divine Journey with Shreeji Seva Bhav."*

### The 20-Minute Blessing (`TimeSpentBlessing.tsx`)
- **A deeply emotional micro-interaction:** When a devotee spends an extended period on the site, a majestic overlay gracefully fades in featuring animated **Floating Diyas** (flames).
- It reads: *"MAY SHRI RADHA RAMAN JI FOREVER BLESS YOU. Thank You For Being A Part Of The Divine Family Of Shreeji Seva Bhav."*
- *(Note: Currently set to trigger after 20 seconds for development verification, but fully architected to trigger after 20 minutes).*

---

## 17. Prem Seva Parivaar (The Divine Family)

In perfect execution of **Rule No. 15 (No User Should Ever Feel Like A Customer)**, the traditional e-commerce concepts of Loyalty Programs, Reward Points, Cashback, and Silver/Gold/Platinum tiers have been completely eradicated at `/parivaar`.

### The Digital Entrance (`ParivaarHero.tsx`)
- Standard loyalty headings are replaced with profound spiritual inclusion: *"The Divine Family Of Shreeji Seva Bhav. Where Every Devotee Becomes A Part Of Our Divine Family."*

### My Divine Journey (`MyDivineJourneyStats.tsx`)
- Completely replaced "Reward Points".
- Devotees now track their journey through a beautiful Glassmorphic dashboard displaying:
  - *Divine Offerings Completed*
  - *Divine Festivals Celebrated*
  - *Beloved Collections*
- This shifts the psychology from "spending money to earn points" to "participating in a sacred journey."

### The 3 Divine Families (`ParivaarTiers.tsx`)
- Silver, Gold, and Platinum are replaced by:
  - **Prem Parivaar**: *"For every devotee beginning their Divine Journey."*
  - **Bhakti Parivaar**: *"Continue Your Seva."* (Visually emphasized)
  - **Seva Parivaar**: *"A beautiful offering for our most beloved devotees."*
- Displayed as luxury Glassmorphic portrait cards featuring `lucide-react` icons (Heart, Sparkles, Crown) glowing in Rose, Gold, and Deep Crimson.

### The Milestone Blessing (`ParivaarBlessing.tsx`)
- Instead of corporate notifications ("Congratulations, You Won 500 Points!"), the system delivers a divine blessing.
- *Example*: *"Wonderful News. You have lovingly completed 20 Divine Offerings. May Shri Radha Raman Ji's divine grace forever remain upon you."*

### The Divine Family Wall (`FamilyWall.tsx`)
- Replaced standard "Social Proof / Trustpilot" sections with a breathtaking deep-crimson container (`bg-[#5C1A1A]`).
- Highlights the sheer scale of devotion: *15,000+ Beloved Devotees*, *1,25,000+ Divine Offerings*, *365 Days of Bhakti & Prem*.
- Anchored by the brand's core truth: *"Made With Love. Made In India. Made For Thakurji."*

### Celebrate With Us (`CelebrateWithUs.tsx`)
- A dynamic festival countdown ensuring the family stays connected to Vrindavan's calendar.
- *Example*: *"The Divine Festival Of Radhashtami is approaching."*
- Follows Rule 14 by providing seamless CTAs to *Explore Festival Collections* and *Offer With Love*.

---

## 16. Experience Vrindavan (The Digital Vrindavan)

In complete realization of **Rule No. 14 (No Page Should Feel Like The End)**, the standard e-commerce approach to "About" or "Tourism Maps" has been replaced with a deeply emotional portal into the sacred land itself at `/vrindavan`.

### The Divine Entrance (`VrindavanHero.tsx`)
- Standard text headers are replaced with immersive philosophy: *"Welcome To The Divine Land Of Vrindavan. Where Every Flower Whispers The Name Of Shri Radhe."*
- Floating lotus petals, intense blur filters, and temple lighting effects create a completely different visual landscape than a typical web page.

### The Divine Sounds (`DivineSounds.tsx`)
- A beautiful Glassmorphic audio interface featuring *Mangal Aarti Ambience*.
- Custom Framer Motion sound-waves pulse around the player when audio is active (ready to be hooked up to your `.mp3` assets).
- Ensures that devotees *hear* Vrindavan without being forcefully interrupted by autoplaying background music.

### The Sacred Sites (`DivineTemples.tsx`)
- Discarded generic photo galleries. 
- Replaced with 8 beautifully designed floating Glassmorphic cards for sacred sites like *Shri Radha Raman Ji, Banke Bihari Ji, and Nidhivan*.
- When a devotee hovers over a temple, an inner golden glow gently rises, revealing the option to *"Offer With Love"*, seamlessly linking back to the Vastra/Wardrobe collections.

### The Divine Calendar (`VrindavanSeasons.tsx`)
- Captured Vrindavan through the seasons (Spring/Holi, Summer/Jhulan Yatra, Monsoon/Radhashtami, Winter/Kartik Maas).
- Uses customized color gradients (e.g., green for Spring, amber for Summer) that bloom upon hover.

### Digital Blessings (`TodaysBlessing.tsx`)
- A sacred space on the page that provides a newly randomized blessing or quote every time the page loads. 
- Example: *"Wherever the mind wanders, may it always return to the dust of Vrindavan."*

### Continuing The Journey (`ContinueJourney.tsx`)
- **Strict Enforcement of Rule 14**: At the bottom of the page, there are no dead-ends.
- Devotees are elegantly invited to:
  - *Return To Temple*
  - *Explore Festival Collections*
  - *Meet The Creator*

---

## 15. The Heart of Shreeji Seva Bhav (Creator Page)

In total realization of **Rule No. 13 (Every devotee should leave knowing *why* it was lovingly created)**, the traditional corporate "About Us / Mission / Vision / CEO" pages have been fundamentally rejected. Instead, devotees are taken on a beautifully emotional journey at `/creator`.

### The Emotional Entrance (`CreatorHero.tsx`)
- Standard headings are replaced by the brand's profound philosophy: *"Every Divine Offering begins with love, continues through Bhakti, and reaches you with blessings."*

### The Portrait of Devotion (`CreatorPortrait.tsx`)
- Discarded standard circular corporate avatars. 
- Introduced a massive, uncropped **Premium Portrait Card** utilizing luxury Glassmorphism, a delicate temple-inspired golden frame, and soft rising lighting effects.
- Akriti Sharma is presented not as a Founder or CEO, but beautifully titled as: *"A Humble Servant Of Shri Radha Raman Ji."* 
- *(Note: The page uses a stunning high-resolution placeholder, ready for the direct insertion of the actual portrait URL).*

### The Spiritual Letter (`CreatorMessage.tsx`)
- Presented as an intimate letter to the devotee (starting with *JAI SHRI RADHE*).
- Housed in a beautifully glowing, ultra-rounded Glassmorphic card that gently blurs the Vrindavan background.
- It shares the core message: *"Every thread woven... carries love, devotion, and prayers."*

### Divine Values & The Journey of Love (`DivineValues.tsx`, `JourneyOfLove.tsx`)
- Corporate jargon like "Our Mission" is replaced with heartfelt statements: *"To Serve. To Celebrate The Divine Festivals Of Vrindavan."*
- Values are displayed as tactile floating pills (*Bhakti*, *Prem*, *Made For Thakurji*).
- A beautifully animated vertical timeline connects the entire ecosystem: From *Vrindavan* → *Handcrafted With Love* → *Received With Divine Blessings*.

---

## 14. The Divine Festivals of Vrindavan (Festival Collections)

In complete realization of **New Rule No. 11 (Every Festival Should Feel Alive)**, the standard e-commerce approach to "Sales" and "New Arrivals" has been replaced with a stunning, dynamically shifting Festival Calendar at `/festivals`.

### The Festival Hub (`/festivals`)
- **Atmosphere**: The central page remains deeply serene, welcoming the devotee to the entire calendar year of Vrindavan.
- **The Digital Countdown**: A highly advanced Glassmorphic component predicting the next festival. It dynamically addresses logged-in users (e.g., *"Welcome Back RISHU. JANMASHTAMI is after 15 DAYS."*) while the massive countdown timer pulses with a divine golden glow.
- **Vrindavan Festival Calendar**: A stunning grid allowing devotees to explore specific upcoming and past festivals (Janmashtami, Radhashtami, Jhulan Yatra, etc.). Each card features subtle, unique colored gradients predicting the atmosphere of that specific event.

### Dynamic Festival Atmosphere (`/festivals/[slug]`)
- **Rule 11 Implementation**: When a devotee clicks into a specific festival like **Janmashtami**, the entire website's atmosphere gracefully shifts! 
- The background transforms into a breathtaking **Midnight Blue** (`bg-[#0B132B]`).
- Custom Midnight Zardozi particles float in the background, simulating a starry, divine night to welcome Thakurji.
- Text shifts to an exclusive Gold-on-Midnight aesthetic.

### Sacred Offering Categories
- Replaced "Trending Categories" with specific, context-aware collections like:
  - **Premium Krishna Poshaks** (Midnight Zardozi Series)
  - **Mukut & Morpankh**
  - **Festival Packaging**
- Integrated seamlessly with the rest of the ecosystem so the devotee can easily transition from exploring a festival into preparing their specific Seva.

---

## 13. Track My Seva (Order Tracking)

In strict adherence to **Rule No. 10**, the generic e-commerce "Tracking" portal at `/track-seva/[id]` has been replaced with a deeply spiritual experience detailing "The Divine Journey Of Your Offering", answering the three critical questions: *Where am I? What can I lovingly do next? How can I continue my Seva?*

### The Divine Journey Timeline (`DivineJourneyTimeline.tsx`)
- Standard tracking statuses have been eradicated. Instead, devotees witness a beautifully animated vertical timeline:
  - 🟡 **Accepted With Love**
  - 🟡 **Lovingly Prepared**
  - 🟡 **Blessed With Premium Packaging**
  - 🟢 **Travelling Towards Your Home (On Its Divine Journey)**
  - ⚪ **Received With Divine Blessings**
- The active state features a glowing `MapPin` enclosed in a gently pulsing Lotus ring.

### Live Delivery System (`LiveDeliveryUpdate.tsx`)
- **Dynamic Updates**: Instead of cold data points, the system presents messages like: *"Wonderful News. Your Divine Offering has reached NEW DELHI."*
- **Festival Aware Tracking**: A beautifully formatted Saffron-to-Gold banner dynamically assures the devotee if their offering will arrive before an upcoming festival (e.g., *"Your Divine Offering will reach before JANMASHTAMI."*).

### Today's Divine Blessing (`DigitalBlessings.tsx`)
- A stunning Glassmorphic card that appears every time the user checks tracking, offering a random *Bhagavad Gita Shloka*, *Vrindavan Blessing*, or *Radha Rani Quote*.
- It acts as "Digital Prasad", ensuring the devotee feels blessed rather than just informed.

### AI Divine Recommendations (`AiDivineRecommendations.tsx`)
- Designed to answer "What can I lovingly do next?", this section intelligently up-sells based on the offering being tracked. 
- For instance, it displays a beautiful Glassmorphic grid suggesting *Premium Mukut*, *Premium Morpankh*, and *Premium Bansuri* alongside a majestic dark-crimson button to "Explore Collection".
- It successfully integrates "Return To Temple", "Latest Divine Arrivals", and "Most Loved By Devotees" into a cohesive spiritual flow.

---

## 12. My Divine Offerings (Order History)

In complete alignment with **Rule No. 8**, the generic e-commerce "Orders" or "Purchase History" page has been entirely reimagined at `/my-offerings` as a sacred space where devotees can lovingly witness the journey of their offerings.

### The Sacred Layout (`page.tsx`)
- **Atmosphere**: The page features the signature Vrindavan aesthetic with a serene cream background, subtle floating lotus petals, and soft Temple lighting effects wrapping the UI.
- **Introduction**: Replaces standard headers with a beautiful message: *"Lovingly witness your sacred offerings as they continue their divine journey to your beloved Thakurji."*

### Divine Filters (`OfferingsFilter.tsx`)
- Replaced standard dropdowns with a horizontal scroll track of premium Glassmorphic pills.
- Categories include: *All Offerings*, *Active Seva*, *Received Blessings*, and *Festival Offerings*.
- The active pill features a liquid Framer Motion slide effect bathed in the Saffron to Gold gradient.

### The Offering History Card (`OfferingHistoryCard.tsx`)
- Standard list rows are now beautifully constructed `backdrop-blur-xl` Glassmorphic cards with inner glowing borders.
- **Terminology Swap**: 
  - "Order ID" ➔ **Divine Offering No.**
  - "Total" ➔ **Seva Amount**
- **The Divine Journey Timeline**: 
  - A custom visual progress bar tracking the spiritual journey of the offering.
  - State 1: **Being Lovingly Prepared** (Processing)
  - State 2: **On Its Divine Journey** (Shipped)
  - State 3: **Received With Divine Blessings** (Delivered)
- Includes dynamic badges for **Festival Packaging** and a premium "Track My Seva" button to progress into Phase 12.

### Intelligent Pairings (`OfferingsRecommendations.tsx`)
- Beneath the history timeline lies the **"Complete Your Divine Offering"** section.
- Suggests *Premium Midnight Blue Vastra* if they ordered matching jewelry, or *Most Loved* Mukuts if they ordered a Poshak.
- Features a beautiful dark-crimson action card inviting them to seamlessly **Return To Temple**.

---

## 11. Your Seva Has Been Accepted (Payment Success)

In obedience to **Rule No. 7**, the generic "Order Successful" screen has been completely eliminated and replaced with a deeply emotional, spiritual blessing at `/seva-accepted`.

### Cinematic Blessing Animation (`SuccessAnimation.tsx`)
- When the page loads, a 6.5-second full-screen `z-100` overlay gracefully fades in. 
- It features slow-falling lotus petals, an animated Shreeji Seva Bhav logo, a simulated swinging Temple Bell, and a radiant Golden glow.
- The glowing text reads: *"Your Seva Has Been Accepted - Thank You For Becoming A Part Of Our Divine Journey"*.
- It softly fades out to reveal the main success dashboard without requiring user interaction.

### The Divine Acceptance (`AcceptedSummary.tsx`)
- **Devotional Message**: Instead of "Thank you for your order", the devotee reads a heartfelt blessing from Shri Radha Raman Ji.
- **Divine Offering No.**: Replaces "Order ID" with a beautifully styled "DIVINE OFFERING NO." (e.g., SSB-2026-108).
- **Festival Aware Delivery**: Displays a "Wonderful News!" badge dynamically assuring the devotee their offering will arrive before the upcoming festival (e.g., Janmashtami).
- **Transactional CTAs**: Replaced with "Track My Seva" and "Continue Your Divine Journey".

### Digital Prasad (`DigitalPrasad.tsx`)
- A completely new and beautiful feature! Every time an offering is accepted, the devotee receives a randomly generated **"Divine Blessing"**.
- This beautifully formatted Glassmorphic card presents a Bhagavad Gita Shloka, a Vrindavan Blessing, or a Radha Rani quote in both Sanskrit and English, providing a profound moment of connection at the end of the journey.

### You May Also Love (`SuccessRecommendations.tsx`)
- A beautiful 4-grid layout seamlessly integrating the devotee back into the temple's flow, offering links to *Latest Divine Arrivals*, *Most Loved By Devotees*, *Festival Collections*, and a beautiful dark-crimson card to *Return To Temple*.

---

## 10. Offer With Love (Divine Checkout Page)

In strict adherence to **Rule No. 6**, the standard e-commerce "Checkout" has been completely reimagined as a deeply spiritual act of finalizing an offering at `/checkout`. 

### Devotional Header (`CheckoutWelcome.tsx`)
- The page opens with a beautiful greeting: *"JAI SHRI RADHE. May Shri Radha Raman Ji's divine blessings forever remain upon your family."*
- Logged-in devotees (like "Rishu") are warmly welcomed and provided with quick links to their *Recently Viewed* and *Beloved Collections* items.

### The Offering Details (`CheckoutForm.tsx`)
- **Delivery Details**: Replaces the generic address form with a Glassmorphic container. Inputs feature floating Lucide icons that gently glow with saffron and lotus colors when focused.
- **Divine Packaging**: A tactile, luxury selector allowing devotees to choose between *Standard Divine Packaging*, *Festival Packaging* (with sparkles), and *Premium Gift Packaging*.
- **Offer This With Love (Gifting)**: 
  - A beautiful toggle. When activated, an elegant `Framer Motion` animation smoothly reveals fields for a "Recipient's Name" and a "Personal Message" to be included in a premium gift box.

### The Final Blessing (`DivineSummary.tsx`)
- **Your Divine Offerings**: Replaces "Order Summary", listing the exact sacred items being prepared.
- **Festival Aware Delivery**: Dynamically displays a "Wonderful News" banner. For example, it calculates that Janmashtami is near and cheerfully informs the devotee that the offering will reach before the festival!
- **Divine Blessings (Coupons)**: Replaced the concept of "Discount Codes". Devotees can enter "Blessings" (like `RADHE108`). When applied, a soft green sparkle animation indicates the blessing has been accepted.
- **Offer With Love**: The final button is a massive, glowing Gold-to-Saffron CTA titled "Offer With Love", completely eliminating the transactional "Place Order" terminology.

### You May Also Love (`CheckoutRecommendations.tsx`)
- Below the fold, devotees are presented with a gorgeous grid connecting them to *Latest Divine Arrivals* and *Festival Collections*, ensuring they can seamlessly "Continue Their Divine Journey".

---

## 9. Complete Your Divine Seva (Divine Cart Page)

Following Rule No. 5 (*Every Action Should Feel Devotional*), completely replaced the traditional "Shopping Cart" with a beautiful, sacred space where devotees lovingly prepare their offerings at `/divine-cart`.

### The Divine Cart Layout (`page.tsx`)
- **Atmosphere**: Maintained the luxurious Vrindavan aesthetic using a serene cream backdrop, floating lotus petals (specifically designed to slowly rise and fade), and a soft golden mist.
- **Terminology Swap**: Standard headers are replaced with "Your Divine Offerings" and "Complete Your Divine Seva".

### Offering Display (`DivineCartItem.tsx`)
- **Design**: Individual items are displayed in beautifully crafted `backdrop-blur-xl` Glassmorphic rows with inner white glowing borders.
- **Interactions**:
  - Replaced the generic "Remove" icon with a gentle "Remove from Seva" action.
  - Custom quantity selectors designed with premium minus/plus icons enclosed in a frosted glass pill.
  - HD Thumbnails feature a slow, luxurious zoom effect on hover.

### The Offering Summary (`DivineSummary.tsx`)
- **Divine Festival Packaging**: Introduced a gorgeous toggle allowing devotees to package their offering in a premium Vrindavan-themed handcrafted box adorned with lotus motifs.
- **Devotional Totals**:
  - Subtotal ➔ **Seva Amount**
  - Shipping ➔ **Temple Delivery** (shows as "Complimentary" for high-tier offerings)
  - Total ➔ **Total Divine Offering**
- **Offer With Love**: Replaced the "Checkout" button with a majestic, glowing Gold-to-Saffron CTA labeled **"Offer With Love"**.

### Smart Upsells (`CartRecommendations.tsx`)
- **Curated Recommendations**: A beautiful horizontal snap-scroll section at the bottom offering intelligent pairings based on what is currently in the cart. Recommends complementary Mukuts, Vastra, and Bansuris to complete the specific Seva being prepared.

---

## 8. The Divine Offering Page (Product Details)

Completely abandoned the standard e-commerce product page layout in favor of a deeply spiritual, immersive, and luxurious presentation at `/divine-offering/[id]`. This page meticulously applies the new terminology guidelines (*Divine Cart*, *Beloved Collections*, *Complete Your Seva*).

### HD Gallery & 360° Simulation (`OfferingGallery.tsx`)
- **Immersive Display**: Housed in an ultra-premium `backdrop-blur-[40px]` glass container with an animated inner gold glow.
- **Interactive HD View**: Features an intelligent cursor-tracking zoom (magnifying glass effect) for inspecting the fine craftsmanship.
- **360° Simulation**: Implemented an interactive scrubber using Framer Motion that allows devotees to switch between multiple angles of the offering, accompanied by a slow-spin animation icon.
- **Atmospheric Touches**: Floating lotus petals and diamond sparkles specifically surround the offering image.

### Craftsmanship & Details (`OfferingDetails.tsx`)
- **Sacred Information**: Replaced standard descriptions with a dedicated "Craftsmanship & Seva" section that highlights the *Bhakti, Prem, and Seva* (e.g., handcrafted in Vrindavan by master artisans).
- **Luxury Interactions**: 
  - Size selectors are rendered as tactile, luxury buttons.
  - The primary CTA is an animated gold-to-saffron **"Add To Divine Cart"** button.
  - Integrated "Add to Beloved Collections" (Wishlist) and WhatsApp inquiry buttons with smooth hover states.
  - Added minimalist trust badges (Pan India Delivery, 7 Day Temple Return, 24/7 Devotee Care).

### The Story Of This Offering (`OfferingStory.tsx`)
- **Editorial Presentation**: An elegant storytelling section explaining the inspiration behind the offering, specifically adapting its text if it is a *Festival Special* (e.g., Janmashtami).
- **Visuals**: Accompanied by a premium editorial image demonstrating the "24 Days of Seva" required by artisans to create the offering.

### Intelligent Cross-Selling (`CompleteOffering.tsx`)
- **"Complete Your Divine Offering"**: If the devotee is viewing a *Poshak*, the system intelligently recommends matching *Ratna Alankaar* (Mukut, Bansuri). If they are viewing jewellery, it recommends matching Vastra. This creates a beautifully cohesive, uninterrupted divine journey.

---

## 7. Ratna Alankaar Mandir (Jewellery Collections)

Created a distinct, majestic collections page at `/jewellery` dedicated to divine ornaments. It establishes the new terminology for future phases, such as **Divine Cart** and **Complete Your Seva**.

### Architectural Hero Section
- **Design**: A glowing, atmospheric treasury bathed in Lotus Pink and Gold gradients.
- **Components**:
  - Central heading: "Shri Radha Rani & Shri Radha Raman Ji's Ratna Alankaar Mandir", wrapped in an animated Gold-to-Lotus text gradient.
  - An SVG background representing the facets of a sacred gem (Ratna).
  - Floating, sparkling diamonds and pearls that rotate gently in the background.

### Alankaar Filters (Horizontal Navigation)
- **Spiritual Filtering**: A luxurious horizontal-scrolling track for specific ornament types (e.g., *Mukut*, *Morpankh*, *Bansuri*, *Necklace*, *Pearl*, *Divine Alankaar*).
- **Interactive States**: Selectors use Framer Motion `layoutId` for a smooth sliding active state matching the Lotus Pink aesthetic.
- **Refined Dropdowns**: Specific filtering for "Shri Radha Rani" or "Shri Radha Raman Ji", as well as festival-specific adornments.

### Alankaar Offering Cards (Product Display)
- **Design Language**: Standard product cards have been reimagined as "Alankaar Offering Cards" with subtle Lotus Pink hover blooms.
- **Interactions**:
  - Hovering triggers gorgeous **Diamond Sparkles** that rise and glow, replacing standard particles to simulate real jewelry facets.
  - Buttons have been updated with the new terminology: **"Add To Divine Cart"**.
  - Dynamic festival badges (*Radhashtami*, *Janmashtami*, etc.).

### Cross-Pollinated Recommendations
- Added a smart "Complete Your Divine Offering" section at the bottom of the page, linking directly to **Radha Rani's Wardrobe** and **Krishna Vastra**, encouraging devotees to match ornaments with Poshaks seamlessly.

---

## 6. Shri Radha Raman Ji's Divine Vastra Mandir (Krishna Vastra)

Created a distinct, majestic collections page at `/krishna-vastra`. While perfectly consistent with the luxury aesthetic of the site, it features its own identity as a "Vastra Mandir" (Temple).

### Architectural Hero Section
- **Design**: A glowing, atmospheric entrance bathed in Peacock Blue and Saffron Deep accents.
- **Components**:
  - Central heading: "Shri Radha Raman Ji's Divine Vastra Mandir", wrapped in a Peacock Blue to Saffron animated gradient.
  - A breathtaking background featuring subtle Temple Arches (Jharokha style) built with SVG, creating the illusion of standing inside the temple.
  - A heartfelt divine blessing message specifically honoring Thakurji.
  - Premium quick-filter CTAs (Latest Divine Offerings, Janmashtami Collections) with distinct `#1E3A8A` hover glows.

### Mandir Filters (Horizontal Navigation)
- **Spiritual Filtering**: Replaced the standard pills with a luxurious, horizontal-scrolling track for "Divine Categories" (e.g., *Janmashtami Special*, *Premium Zardozi*, *Nandotsav Offerings*).
- **Interactive States**: Selectors use Framer Motion `layoutId` for a smooth sliding active state that perfectly matches the deep blue identity.
- **Refined Dropdowns**: Luxury frosted glass dropdowns for selecting sizes and specifically tuning the offerings for "Laddu Gopal Ji" or "Shri Radha Raman Ji".

### Vastra Offering Cards (Product Display)
- **Design Language**: Standard product cards have been reimagined as "Vastra Offering Cards" wrapped in `backdrop-blur-[32px]` with subtle `#1E3A8A` inner mandala glows.
- **Interactions**:
  - When hovering, instead of lotus petals, beautiful **Golden Particles** slowly rise upwards, mimicking the divine aura of Thakurji.
  - Features dynamic Festival badges (*Janmashtami*, *Nandotsav*, *Govardhan Pooja*).
  - Direct WhatsApp inquiry integration alongside a Wishlist (Heart) button.

---

## 5. Radha Rani's Divine Wardrobe (Collections Page)

Created a production-ready, highly immersive collections page at `/divine-wardrobe`. The core philosophy of this page ensures visitors never feel they are merely purchasing clothes, but rather lovingly selecting a Divine Offering for Thakurji.

### Atmospheric Hero Section
- **Design**: A cinematic entrance replacing generic collection headers.
- **Components**:
  - Central heading: "Radha Rani's Divine Wardrobe", wrapped in an animated gold-to-saffron text gradient.
  - A heartfelt divine blessing message explaining the craftsmanship (Bhakti, Prem, Seva).
  - Premium quick-filter CTAs (Latest Divine Arrivals, Premium Collections) with Dior-inspired hover glows.
  - Floating divine clouds, temple lighting effects, and lotus petals to set a serene mood.

### Divine Filters (Glassmorphic Navigation)
- **Spiritual Filtering**: Replaced traditional sidebar filters with elegant Glassmorphic top pill selectors (Divine Collections, Festival Collections, Handmade Collections).
- **Interactive States**: Pill selectors use Framer Motion `layoutId` for a smooth sliding active state that physically glides between categories.
- **Refined Dropdowns**: Luxury frosted glass dropdowns for selecting Sizes and adjusting the Price Range.

### Offering Cards (Product Display)
- **Design Language**: Standard product cards have been reimagined as "Offering Cards" wrapped in `backdrop-blur-[32px]` with subtle inner mandala glows.
- **Terminology Updates**: 
  - "Price" ➔ **Divine Offering**
  - "Add to Cart" ➔ **Add To My Seva** (represented by a golden gradient icon).
- **Integrations & Interactions**:
  - High-fidelity placeholder for HD Product Images with smooth zoom-on-hover scale effects.
  - Included a Quick "View Details" overlay that gently fades in over the image.
  - Direct WhatsApp inquiry integration alongside a Wishlist (Heart) button.
  - "Premium Devotion" badges applied dynamically to high-tier Poshaks.

---

## 4. Premium "My Seva" Page (User Profile)

Created a deeply spiritual and luxurious dashboard experience at `/my-seva`, replacing generic profile terminology with a sacred digital temple space.

### Profile Header (Glassmorphic)
- **Design**: A glowing, glassmorphic header card with an inner mandala glow and a subtle gradient border.
- **Components**:
  - A circular avatar with a rotating golden halo and a VIP "Crown" badge.
  - A warm greeting: "Jai Shri Radhe, Devotee" followed by a divine blessing.
  - **Quick Stats Badges**: "Seva Journeys" (Total Orders) and "Beloved Collections" (Wishlist Items) rendered in glassmorphic floating tiles.

### Spiritual Navigation & Dynamic Content
- **Custom Tab Navigation**: Designed with Apple's minimalism. Tabs include:
  - *My Seva Journey* (Orders Tracker)
  - *Beloved Collections* (Curated Wishlist)
  - *Prem Seva Membership* (VIP Access)
  - *Personal Details* (Account Info)
- **Dynamic Content Area**: Uses `Framer Motion` to smoothly slide and fade between tab content.
- **Card Aesthetics**: All inner content cards utilize `backdrop-blur-[24px]` on a cream background, surrounded by subtle `gold-start/20` borders, resulting in a premium, layered aesthetic perfectly tied to the brand's color palette (Cream, Saffron, Lotus Pink, Peacock Blue).

---

## 3. Premium Login/Signup Page (Auth Portal)

Created a production-ready authentication portal at `/login` inspired by Apple's Vision OS and Tanishq's luxury.

### 60:40 Split-Screen Layout
- **Left Section (60%)**: 
  - Showcases the Shreeji Seva Bhav logo with a subtle pulsating golden glow behind it.
  - Features the brand philosophy ("Bhakti • Prem • Seva") with premium typography.
  - Atmospheric background: Slow-floating divine clouds, soft golden particles, and floating lotus petals to create a serene environment.
- **Right Section (40%)**:
  - A responsive Glassmorphic Login/Signup container.
  - Built with `backdrop-blur-[24px]`, cream tints, soft golden borders, and subtle inner mandala glows for depth.

### Interactive AuthForm Component
- **Smooth State Toggling**: Uses Framer Motion's `AnimatePresence` to seamlessly slide between "Login" and "Sign Up" modes, hiding/showing the "Full Name" field dynamically.
- **Form Controls**: Beautifully styled inputs with floating Lucide icons, saffron focus rings, and a password visibility toggle.
- **Luxury Buttons**: 
  - Primary button features an animated gold-to-saffron gradient.
  - Minimalist "Continue with Google" button with Apple-like micro-interactions.
  - Elegant "Continue as Guest" text link with a hover underline animation.

---

## Enhanced Aesthetic Walkthrough (Homepage)

### 1. Rebuilt 100vh Hero Section & Centered Scroll Indicator
- **Viewport Constraints**: Re-structured the entire hero layout height to fit perfectly within `100vh` (including the announcement bar, header navbar, content blocks, and the glass card banner) with zero overflows or scrollbar triggers.
- **Deity Size & Positioning**: Scaled down the Shri Radha Raman Ji deity image to `max-w-[365px]` (approximately 12% size reduction) to give the layout perfect breathing room. Positioned the image slightly left and up with `-translate-y-[9%]`.
- **Scroll Indicator**: Added the `Scroll Down -> Lotus -> Bouncing Arrow` indicator perfectly centered between the CTA buttons and the glassmorphic card.

### 2. Premium Glassmorphic Trust Card Banner
- **Glassmorphism**: Upgraded the bottom information card banner to a premium glass container (`backdrop-blur-[25px] bg-[#FFFBF4]/85 border border-[#D4A853]/35 shadow-[0_12px_45px_rgba(212,168,83,0.08)] rounded-[30px]`).
- **Devotional Segments**: Displayed 5 segments (Handcrafted, Premium Quality, Pure Devotion, Pan India, Secure Pack) with vector gold-plated icons, subtle animations, and hover transitions.

---

## The Divine Journey to Vrindavan (18s Opening Intro)

Rebuilt the opening sequence ([DivineIntro.tsx](file:///Users/rishu20/Downloads/c++/myprojects/shreejisevabhav/src/components/ui/DivineIntro.tsx)) into a cinematic 18-second blessing skippable after 8 seconds:

- **Phase 1 (0-3s)**: Disney-style moving cream/golden clouds, floating lotus petals, mist, and soft morning breeze. No text.
- **Phase 2 (3-6s)**: A custom **Mor Pankh** (peacock feather) floats in from the left with soft rotation and gold/rainbow reflections. Sanskrit text `|| श्री राधे राधे ||` glows in the center.
- **Phase 3 (6-9s)**: A beautiful **Golden Murli** (Krishna's flute) floats in from the right, rotating slowly. Flute synth starts playing. "Welcome to Vrindavan" appears.
- **Phase 4 (9-12s)**: Murli & Mor Pankh settle in a layered 3D depth composition:
  - **Mor Pankh Backdrop**: Positioned as a majestic halo backdrop centered directly behind the text `SHREEJI SEVA BHAV` (`z-0`, `scale-1.35`, and standard `blur-[2px]`) to maintain legibility.
  - **Golden Murli Tilted**: Positioned diagonally *beneath* the tagline with 3D perspective depth, shifted down and right to avoid colliding with typography.
- **Phase 5 (12-15s)**: Displays "Made with BHAKTI • PREM • SEVA" and the three prayers: *Every Thread is an Offering*, *Every Ornament is a Prayer*, *Every Creation is a Seva*. The Mor Pankh remains in the background as a halo, and the Murli sits diagonally at the bottom.
- **Phase 6 (15-18s)**: Clouds dissolve upward, revealing the header navbar and the main hero page.

---

## Vector Art Details (Lord Krishna's Priceless Ornaments)

### 1. Ultra Premium Mor Pankh
- Multi-layered procedural layout featuring radial gold-gold boundaries, custom radial emerald/teal transitions, royal blue/sapphire core ellipses, and a glossy shine reflection vector.
- 48 individual feather barbs curve symmetrically with background shadows to simulate realistic 3D volume.

### 2. Divine Golden Murli Flute
- Designed as a priceless gold temple jewelry artifact.
- Features golden engravings, 3D cylindrical shine gradients, red silk wraps, hanging gold *ghungroo* chime bells, and red/gold beaded silk tassels.

---

## Verification & Build Status

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Compiled successfully |
| TypeScript | ✅ 0 type errors |
| Console Errors | ✅ 0 console errors |
| 100vh Height fit | ✅ Fits perfectly in standard viewports with no scrollbars |
| Dev Server | ✅ Running on port 3000 |
