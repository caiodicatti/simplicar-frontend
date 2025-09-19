import React, { useEffect, useState } from "react";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { useAuth } from '../../context/AuthContext';
import apiMock from "../../services/apiMock";

export default function ProfilePage() {
    const { user } = useAuth(); // pega do contexto!
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            apiMock.getCurrentUser(user.id).then(data => {
                setProfileData(data);
                setLoading(false);
            });
        }
    }, [user]);

    function handleSave(data) {
        setLoading(true);
        apiMock.saveProfile(data).then(() => {
            setProfileData(data);
            setLoading(false);
        });
    }

    function handleCancel() {
        setProfileData(user);
    }

    if (loading) return <div className="vehicleform-wrapper"><div>Carregando...</div></div>;
    return (
        <div className="vehicleform-wrapper">
            <ProfileForm initialData={profileData} onSave={handleSave} onCancel={handleCancel} />
        </div>
    );
}