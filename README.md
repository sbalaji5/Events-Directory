# Illini Events Hub

Illini Events Hub is a campus-wide discovery and engagement platform tailored for University of Illinois Urbana-Champaign (UIUC) students. It centralizes event listings, enables rich categorization, and provides personalized recommendations through an intuitive swipe-based interface.

## Goals
- **Centralize campus events** posted by registered organizations, departments, and students.
- **Reduce information overload** by organizing events into discoverable categories (e.g., Tech, Entrepreneurship, Sports, Arts).
- **Personalize the student experience** with preference-based feeds and smart notifications.
- **Foster community engagement** by making it easy to RSVP, share, and collaborate around campus happenings.

## Core Features
### 1. Event Discovery
- Curated home feed tailored to interests and swipe history.
- Category tabs (Tech, Entrepreneurship, Sports, Wellness, Arts, Academics, Social) with subfilters.
- Highlighted events ("Spotlight", trending, closing soon) surfaced by engagement metrics.
- Powerful search with keyword, date, location, organizer, and tag filters.

### 2. Swipe-to-Interested Interaction
- Tinder-style card deck for quick triage of upcoming events.
- Swipe right (Interested) to add to personal calendar and improve recommendations.
- Swipe left (Not Interested) to hide similar events temporarily.
- Long-press/expand gesture for rich event details (speakers, agenda, RSVP links).

### 3. Personalized Profiles
- Interests onboarding flow that seeds default categories.
- Machine learning recommendations using swipe history, RSVPs, and peer activity.
- Personal dashboard with saved events, waitlists, and RSVP status.

### 4. Organizer Tools
- Organization dashboards with analytics (views, swipes, RSVPs).
- Event creation wizard with approval workflow through the Office of Student Affairs.
- Bulk invite and cross-posting to social platforms.
- Templates for recurring events and co-hosting features.

### 5. Campus Integrations
- NetID single sign-on for authentication.
- Integration with UIUC calendar feeds, RSO (Registered Student Organization) database, and campus map APIs.
- Push notifications through the official UIUC mobile ecosystem.

## User Personas
| Persona | Goals | Pain Points | Key Features |
| --- | --- | --- | --- |
| **First-Year Explorer** | Find communities and welcome events | Overwhelmed by information, unsure where to start | Onboarding interests, swipe discovery, trending events |
| **Tech Enthusiast** | Attend hackathons and speaker series | Hard to track multiple channels | Tech category feed, RSVP sync, waitlist alerts |
| **RSO Organizer** | Promote events and track interest | Limited analytics, manual RSVP tracking | Organizer dashboard, analytics, calendar integration |
| **Graduate Researcher** | Share academic talks & seminars | Small audiences, little visibility | Category filters, targeted notifications, cross-posting |

## Experience Flow
1. **Onboarding:** Student logs in with NetID, selects interests, imports calendar.
2. **Discover:** Swipe or browse categories; AI curates feed.
3. **Engage:** Swipe right to save, RSVP, join waitlist, or share with friends.
4. **Organize:** RSO leads publish events, manage approvals, review analytics.
5. **Retain:** Weekly digests, smart reminders, and friend activity prompts keep students returning.

## Information Architecture
- **Event Categories:** Tech, Entrepreneurship, Sports, Arts, Wellness, Academic, Social, Cultural, Service.
- **Tags:** Additional descriptors (e.g., "Hackathon", "Networking", "Varsity").
- **Locations:** Linked with campus map for directions and occupancy info.
- **Event Metadata:** Title, description, date/time, location, hosts, capacity, RSVP link, cost, accessibility notes, media gallery.

## Data Model Overview
- `User`: profile, interests, class year, swipe history, RSVPs.
- `Organization`: name, officers, verified status, event history.
- `Event`: metadata, category, tags, location, capacity, visibility.
- `Swipe`: user-event interaction with timestamp and direction.
- `Recommendation`: generated suggestions with ranking scores.
- `Notification`: delivery state for reminders and updates.

## Personalization Engine
- Hybrid recommender combining:
  - **Content-based filtering** on categories, tags, and keywords.
  - **Collaborative filtering** using aggregate swipe patterns from similar students.
  - **Contextual signals** (time of day, upcoming deadlines, location proximity).
- Feedback loop refines weights from swipe outcomes and attendance confirmation.

## Technology Stack
- **Mobile Apps:** React Native for iOS & Android.
- **Backend:** Node.js/TypeScript with NestJS or Express, GraphQL API.
- **Database:** PostgreSQL with PostGIS for spatial queries; Redis for caching sessions and feed data.
- **Search & Recommendations:** ElasticSearch for full-text search; Python microservice for ML models.
- **Hosting:** AWS (ECS or EKS) with CI/CD pipeline via GitHub Actions.
- **Notifications:** Firebase Cloud Messaging & Apple Push Notification service.

## Security & Compliance
- Enforce NetID authentication via Shibboleth/OAuth.
- Role-based access control for students, organizers, and admins.
- FERPA-conscious handling of student data with audit logging.
- GDPR-inspired consent for data usage and analytics.

## Roadmap
1. **MVP (3 months)**
   - Core event feed with categories, swipe interactions, RSVPs.
   - Organizer event submission and admin approval workflow.
   - NetID SSO and calendar export.
2. **Phase 2 (6 months)**
   - Recommendation engine with collaborative filtering.
   - Push notifications and weekly digests.
   - Event analytics dashboard for organizers.
3. **Phase 3 (12 months)**
   - Advanced social features (friend feeds, group chats).
   - Marketplace integrations (ticketing, merchandise).
   - Partner integrations with local businesses and campus services.

## Success Metrics
- Monthly active users (MAU) and retention.
- Swipe-to-RSVP conversion rate.
- Average events discovered per session.
- Organizer satisfaction and event attendance uplift.
- Reduction in duplicate or conflicting events.

## Future Enhancements
- AI-generated event summaries and highlights.
- AR campus map overlays for event navigation.
- Sponsorship marketplace for local businesses.
- Open API for campus departments to syndicate data.

---
Illini Events Hub delivers a personalized, data-driven campus experience, helping UIUC students discover meaningful opportunities while giving organizers the insights they need to grow engagement.
