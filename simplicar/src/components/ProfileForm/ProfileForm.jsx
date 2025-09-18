import React, { useState } from "react";

export default function ProfileForm({ initialData, onSave, onCancel }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        birthDate: "",
        login: "",
        ...initialData
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (onSave) onSave(form);
    }

    return (
        <form className="vehicleform-form p-4" onSubmit={handleSubmit}>
            <h2>Perfil</h2>
            <div className="profile-section">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Login</label>
                        <input
                            type="text"
                            name="login"
                            className="form-control"
                            value={form.login}
                            readOnly
                            disabled
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Data de Nascimento</label>
                        <input
                            type="date"
                            name="birthDate"
                            className="form-control"
                            value={form.birthDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-2 justify-content-end mt-4">
                <button type="submit" className="btn btn-success">Salvar</button>
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
}