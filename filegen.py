import os

# =========================================================
# PediMilestones React + Firebase + OpenAI Project Generator
# =========================================================

PROJECT_NAME = "pedimilestones"

folders = [
    "public/icons",

    "src/routes",
    "src/pages",
    "src/components",
    "src/layouts",
    "src/firebase",
    "src/services",
    "src/ai",
    "src/charts",
    "src/hooks",
    "src/context",
    "src/utils",
    "src/data/growth",
    "src/data/milestones",
    "src/styles",
    "src/constants",
]

files = {
    # ROOT
    ".env": "",
    ".gitignore": "node_modules\n.env\ndist\n",
    "firebase.json": "{\n  \"hosting\": {}\n}",
    "firestore.rules": "",
    "firestore.indexes.json": "{}",
    "README.md": "# PediMilestones\n",

    # PUBLIC
    "public/manifest.json": "{}",

    # SRC ROOT
    "src/main.jsx": """import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
""",

    "src/App.jsx": """function App() {
  return <h1>PediMilestones</h1>;
}

export default App;
""",

    # ROUTES
    "src/routes/index.jsx": "",

    # PAGES
    "src/pages/Home.jsx": "",
    "src/pages/Login.jsx": "",
    "src/pages/Register.jsx": "",
    "src/pages/Dashboard.jsx": "",
    "src/pages/GrowthTracker.jsx": "",
    "src/pages/Milestones.jsx": "",
    "src/pages/ChildProfile.jsx": "",
    "src/pages/AboutDoctor.jsx": "",
    "src/pages/PrivacyPolicy.jsx": "",
    "src/pages/Terms.jsx": "",
    "src/pages/NotFound.jsx": "",

    # COMPONENTS
    "src/components/Navbar.jsx": "",
    "src/components/Footer.jsx": "",
    "src/components/Sidebar.jsx": "",
    "src/components/ChildCard.jsx": "",
    "src/components/GrowthForm.jsx": "",
    "src/components/GrowthTable.jsx": "",
    "src/components/PercentileBadge.jsx": "",
    "src/components/MilestoneCard.jsx": "",
    "src/components/ProtectedRoute.jsx": "",
    "src/components/LoadingSpinner.jsx": "",
    "src/components/Modal.jsx": "",

    # LAYOUTS
    "src/layouts/MainLayout.jsx": "",
    "src/layouts/DashboardLayout.jsx": "",

    # FIREBASE
    "src/firebase/config.js": """import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
""",

    "src/firebase/auth.js": "",
    "src/firebase/firestore.js": "",
    "src/firebase/storage.js": "",

    # SERVICES
    "src/services/childService.js": "",
    "src/services/growthService.js": "",
    "src/services/milestoneService.js": "",
    "src/services/authService.js": "",
    "src/services/reportService.js": "",

    # AI
    "src/ai/openai.js": "",
    "src/ai/milestoneAnalysis.js": "",
    "src/ai/growthInsights.js": "",
    "src/ai/developmentalRisk.js": "",

    # CHARTS
    "src/charts/GrowthChart.jsx": "",
    "src/charts/HeightChart.jsx": "",
    "src/charts/WeightChart.jsx": "",
    "src/charts/BMIChart.jsx": "",
    "src/charts/chartUtils.js": "",

    # HOOKS
    "src/hooks/useAuth.js": "",
    "src/hooks/useChildren.js": "",
    "src/hooks/useGrowthData.js": "",
    "src/hooks/useMilestones.js": "",
    "src/hooks/useOpenAI.js": "",

    # CONTEXT
    "src/context/AuthContext.jsx": "",
    "src/context/ThemeContext.jsx": "",

    # UTILS
    "src/utils/calculateAge.js": "",
    "src/utils/percentileCalculator.js": "",
    "src/utils/interpolation.js": "",
    "src/utils/bmiCalculator.js": "",
    "src/utils/growthHelpers.js": "",
    "src/utils/validators.js": "",

    # DATA
    "src/data/growth/iap_height_male.json": "{}",
    "src/data/growth/iap_height_female.json": "{}",
    "src/data/growth/iap_weight_male.json": "{}",
    "src/data/growth/iap_weight_female.json": "{}",
    "src/data/growth/iap_bmi_male.json": "{}",
    "src/data/growth/iap_bmi_female.json": "{}",

    "src/data/milestones/milestones_2m.json": "{}",
    "src/data/milestones/milestones_4m.json": "{}",
    "src/data/milestones/milestones_6m.json": "{}",

    # STYLES
    "src/styles/globals.css": """body {
  margin: 0;
  font-family: sans-serif;
}
""",

    "src/styles/variables.css": "",
    "src/styles/dashboard.css": "",
    "src/styles/charts.css": "",

    # CONSTANTS
    "src/constants/roles.js": "",
    "src/constants/chartConfig.js": "",
    "src/constants/routes.js": "",
    "src/constants/appConfig.js": "",
}


def create_project(parent_folder):
    project_root = os.path.join(parent_folder, PROJECT_NAME)

    print(f"Creating project at:\\n{project_root}\\n")

    # Create folders
    for folder in folders:
        folder_path = os.path.join(project_root, folder)
        os.makedirs(folder_path, exist_ok=True)

    # Create files
    for file_path, content in files.items():
        full_path = os.path.join(project_root, file_path)

        os.makedirs(os.path.dirname(full_path), exist_ok=True)

        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)

    print("\\n✅ Project structure generated successfully!")
    print(f"\\nLocation: {project_root}")


if __name__ == "__main__":
    parent = input("Enter parent folder path: ").strip()
    create_project(parent)