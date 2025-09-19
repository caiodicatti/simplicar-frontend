import React, { useEffect, useState } from "react";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import apiMock from "../../services/apiMock";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const session = JSON.parse(localStorage.getItem("userSession") || "{}");

    useEffect(() => {
        apiMock.getCurrentUser(session.id).then(data => {
            setUser(data);
            setLoading(false);
        });
    }, []);

    function handleSave(data) {
        setLoading(true);
        apiMock.saveProfile(data).then(() => {
            setUser(data);
            setLoading(false);
        });
    }

    function handleCancel() {
        // Volta para os dados originais
        setUser(user);
    }

    if (loading) return <div className="vehicleform-wrapper"><div>Carregando...</div></div>;
    return (
        <div className="vehicleform-wrapper">
            <ProfileForm initialData={user} onSave={handleSave} onCancel={handleCancel} />
        </div>
    );
}