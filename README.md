# Video Freelancer Invoice Generator

A sleek, offline-first web application designed specifically for video production freelancers and colorists to generate clean, professional PDF invoices instantly. 

Built as **Project #2** of a 90-Day / 30-Project Developer Sprint.

## 🚀 Features

* **Split-Screen UI:** Real-time invoice preview that updates as you type.
* **Auto-Save (Local Storage):** Never lose your draft. Client details, line items, and bank information are silently saved to your browser on every keystroke.
* **Native PDF Export:** Hijacks the browser's native print engine via Tailwind print modifiers to generate pristine, dark-mode-free PDF documents.
* **Dynamic Line Items:** Add, edit, and remove gear rates (e.g., Sony a7 IV, Drone), editing hours, and quantities with instant total calculation.
* **Customizable Fine Print:** Editable sections for Bank/Wire details and Terms & Conditions.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS (with specific `print:` modifiers)
* **Icons:** Lucide React
* **State Management:** React `useState` & `useEffect` (Synced with `localStorage`)
* **Deployment:** Vercel

## 💻 Running Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/abikurian/video-invoicer.git](https://github.com/abikurian/video-invoicer.git)

2. Navigate to the project directory and install dependencies:

    ```Bash
    cd video-invoicer
    npm install
    ```
3. Start the development server:

    ```Bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser.

🌐 Live Demo
Hosted on Vercel: (https://video-invoicer-zeta.vercel.app/)