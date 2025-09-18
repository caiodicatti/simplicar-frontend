import React from "react";
import UserPreferences from "../../components/UserPreferences/UserPreferences";
import "./UserPreferencesPage.css";

export default function UserPreferencesPage() {
    return (
        <div className="preferences-page-center">
            <div className="preferences-page-content">
                <UserPreferences />
            </div>
        </div>
    );
}