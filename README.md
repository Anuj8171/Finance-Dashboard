#  FinanceDash — Finance Dashboard

A simple and interactive finance dashboard to track income, expenses, and spending patterns.

## 🔗 Live Demo
https://finance-dashboard-j6dsk1xdy-anujs-projects-a659882e.vercel.app/

---

##  Tech Stack
- React + Vite
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)
- Recharts (Charts)
- MockAPI.io (Mock Backend)
- Axios, React Hot Toast, Lucide React

---

##  Features
- Dashboard with summary cards and charts
- Transactions list with search, filter, and sort
- Add, edit, delete transactions (Admin only)
- Role based UI (Admin / Viewer)
- Insights with spending analysis
- Export transactions to CSV
- Smooth animations throughout
- Fully responsive design

---

##  Setup
```bash
# Clone the repo
git clone https://github.com/Anuj8171/Finance-Dashboard.git
# Install dependencies
cd finance-dashboard
npm install

# Run the app
npm run dev
```

Open `http://localhost:5173`

---

## Roles

| Feature | Viewer | Admin |
|---|---|---|
| View data | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit / Delete | ❌ | ✅ |


Switch roles using the dropdown in the navbar.

---

##  API
MockAPI.io is used as a mock backend.

| Method | Endpoint | Action |
|---|---|---|
| GET | /transactions | Fetch all |
| POST | /transactions | Add new |
| PUT | /transactions/:id | Update |
| DELETE | /transactions/:id | Delete |

---

## Approach

I built this project by breaking it down into 3 main parts:

### 1. Data Layer
Used MockAPI.io as a mock backend to simulate real API calls (GET, POST, PUT, DELETE) on transactions. This made the app behave like a real production app without needing a backend. All API calls are handled through Axios in a separate api/ folder.

### 2. State Management
Used Zustand to manage application state. Created two stores:
- transactionStore — handles fetching, adding, editing, deleting transactions and all filter/search/sort logic
- roleStore — handles the current role (Admin/Viewer)

This kept components clean and avoided prop drilling.

### 3. UI & Experience
- Built a dark themed glassmorphism design using Tailwind CSS
- Used Framer Motion for smooth page load animations, card entrances and modal transitions
- Used Recharts for 3 charts — Line chart for balance trend, Donut chart for spending breakdown, Bar chart for income vs expense comparison
- Insights are dynamically calculated from real transaction data — no hardcoded values
- Role based UI changes the entire interface depending on selected role — Viewer sees read only, Admin gets full control

### 4. Data Persistence
Instead of using localStorage, I used MockAPI.io as the data persistence layer.

Every action the Admin performs is directly saved to the MockAPI server:
- Adding a transaction → POST request saves it to MockAPI
- Editing a transaction → PUT request updates it on MockAPI
- Deleting a transaction → DELETE request removes it from MockAPI

This means data is never lost on page refresh because it is stored on the server, not in the browser. Any device or browser that opens the app will always see the latest data.

This approach is closer to how real production apps work compared to localStorage though being a free tier it has limitations such as maximum 100 objects per resource.

##  Notes

- Role switching is frontend only
- Data pre-seeded with 30 transactions

## Author

**Anuj Singh Rana**
 anujrana9264@gmail.com

Made with ❤️ for evaluation

