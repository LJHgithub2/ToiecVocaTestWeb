import React, { useEffect, useState } from 'react';
import {
    getProfile,
    updateProfile,
    uploadProfileImage,
    deleteProfileImage,
} from '../services/profileService';
import { useAuth } from '../context/AuthContext';
import ProfileImage from '../components/profileImage';

export default function Profile() {
    const { user, setIsAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [formData, setFormData] = useState({ lastname: '', firstname: '', job: '', gender: '', bio: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await getProfile(user.username);
                if (data) {
                    setProfile(data);
                    setFormData({
                        lastname: data.lastname || '',
                        firstname: data.firstname || '',
                        job: data.job || '',
                        gender: data.gender || '',
                        bio: data.bio || '',
                    });
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            }
        })();
    }, [user.username, setIsAuthenticated]);

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (await updateProfile(user.username, formData)) {
                setProfile((prev) => ({ ...prev, ...formData }));
            } else {
                alert('변경에 실패하였습니다.');
            }
            setEditingField(null);
            setModalOpen(false);
        } catch {
            alert('프로필 업데이트에 실패하였습니다.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setModalOpen(false);
        setEditingField(null);
    };

    const openEditModal = (field) => {
        setEditingField(field);
        setModalOpen(true);
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const fd = new FormData();
        fd.append('profile_image', file);
        try {
            await uploadProfileImage(user.username, fd);
            window.location.reload();
        } catch {
            alert('이미지 변경에 실패하였습니다.');
        }
    };

    const handleImageDelete = async () => {
        try {
            await deleteProfileImage(user.username);
            window.location.reload();
        } catch {
            alert('이미지 삭제에 실패하였습니다.');
        }
    };

    const fieldLabels = {
        job: '직업',
        gender: '성별',
        bio: '자기소개',
    };

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Profile header card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-indigo-500 to-indigo-600" />
                <div className="px-6 pb-6">
                    <div className="flex items-end justify-between -mt-10 mb-4">
                        <div className="ring-4 ring-white rounded-full">
                            <ProfileImage width={20} height={20} />
                        </div>
                        <div className="flex gap-2 mt-2">
                            <label className="cursor-pointer px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                                사진 변경
                                <input
                                    id="Profile_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={handleImageDelete}
                                className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                사진 삭제
                            </button>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                        {profile.lastname}{profile.firstname}
                    </h2>
                    <p className="text-sm text-slate-400">@{profile.username}</p>
                </div>
            </div>

            {/* Info card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                <div className="px-6 py-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">프로필 정보</h3>
                </div>
                {[
                    { field: 'fullname', label: '이름', value: `${profile.lastname || ''} ${profile.firstname || ''}`.trim(), editable: false },
                    { field: 'job', label: '직업', value: profile.job, editable: true },
                    { field: 'gender', label: '성별', value: profile.gender, editable: true },
                    { field: 'bio', label: '자기소개', value: profile.bio, editable: true },
                ].map(({ field, label, value, editable }) => (
                    <div key={field} className="flex items-center justify-between px-6 py-4">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
                            <p className="text-sm text-slate-800 break-words">{value || '-'}</p>
                        </div>
                        {editable && (
                            <button
                                onClick={() => openEditModal(field)}
                                className="ml-4 p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-colors flex-shrink-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5l11.732-11.732z" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Vocabulary card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">사용 단어장</h3>
                </div>
                {profile.myVocabulary && profile.myVocabulary.length > 0 ? (
                    <ul className="divide-y divide-slate-100">
                        {profile.myVocabulary.map((voca, i) => (
                            <li key={i} className="flex items-center gap-3 px-6 py-3.5">
                                <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-indigo-600 text-xs font-bold">📖</span>
                                </div>
                                <span className="text-sm text-slate-700 font-medium">{voca.name}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="px-6 py-8 text-center">
                        <p className="text-sm text-slate-400">사용 중인 단어장이 없습니다</p>
                    </div>
                )}
            </div>

            {/* Edit modal */}
            {modalOpen && editingField && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm animate-slide-up">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-semibold text-slate-900">{fieldLabels[editingField] || editingField} 수정</h3>
                            <button
                                onClick={handleCancel}
                                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 py-5">
                            <input
                                type="text"
                                name={editingField}
                                value={formData[editingField] || ''}
                                onChange={handleInputChange}
                                className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder={`${fieldLabels[editingField] || editingField}을(를) 입력하세요`}
                            />
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex gap-3 justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : '저장'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
