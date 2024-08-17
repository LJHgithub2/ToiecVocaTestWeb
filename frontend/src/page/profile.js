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
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        job: '',
        gender: '',
        bio: '',
    });
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
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
            } catch (error) {
                console.log('Failed to fetch profile data.');
                setIsAuthenticated(false);
            }
        };

        fetchProfile();
    }, [user.username, setIsAuthenticated]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        console.log(user.username, formData);
        try {
            if (await updateProfile(user.username, formData)) {
                setProfile({ ...profile, ...formData });
            } else {
                alert('변경에 실패하였습니다.');
            }
            setEditingField(null);
            setModalOpen(false);
        } catch (error) {
            alert('프로필 업데이트에 실패하였습니다.');
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
        if (file) {
            const formData = new FormData();
            formData.append('profile_image', file);

            try {
                await uploadProfileImage(user.username, formData);
                window.location.reload();
            } catch (error) {
                alert('이미지 변경에 실패하였습니다.');
            }
        }
    };

    const handleImageDelete = async () => {
        try {
            await deleteProfileImage(user.username);
            window.location.reload();
        } catch (error) {
            alert('이미지 삭제에 실패하였습니다.');
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center p-3 bg-gray-100">
                <div className="flex items-start bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-4xl">
                    <div className="flex items-center w-full flex-col sm:flex-row">
                        <div className="basis-1/3 flex justify-center">
                            <ProfileImage width={64} height={64} />
                        </div>
                        <div className="flex flex-col basis-2/3">
                            <label className="block text-sm font-medium text-center py-3 text-gray-700">
                                프로필 사진
                            </label>
                            <div className="flex sm:flex-col items-center justify-center gap-2">
                                <button
                                    className="w-40 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    onClick={() =>
                                        document
                                            .getElementById('Profile_image')
                                            .click()
                                    }
                                >
                                    프로필 사진 변경
                                </button>
                                <input
                                    id="Profile_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <button
                                    onClick={handleImageDelete}
                                    className="w-40 py-2 px-4 border m-0 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                >
                                    프로필 사진 삭제
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <EditableField
                        label="이름"
                        field="fullname"
                        value={`${profile.lastname} ${profile.firstname}`}
                        openEditModal={null} // 편집 버튼을 없애기 위해 null로 설정
                    />
                    <EditableField
                        label="직업"
                        field="job"
                        value={profile.job}
                        openEditModal={openEditModal}
                    />
                    <EditableField
                        label="성별"
                        field="gender"
                        value={profile.gender}
                        openEditModal={openEditModal}
                    />
                    <EditableField
                        label="자기 소개"
                        field="bio"
                        value={profile.bio}
                        openEditModal={openEditModal}
                    />
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-semibold leading-6 text-gray-900">
                            사용 단어장
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                {profile.myVocabulary &&
                                profile.myVocabulary.length > 0 ? (
                                    profile.myVocabulary.map(
                                        (vocabulary, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                            >
                                                <div className="flex w-0 flex-1 items-center">
                                                    <span className="ml-4 flex min-w-0 flex-1 truncate">
                                                        {vocabulary.name}
                                                    </span>
                                                </div>
                                            </li>
                                        )
                                    )
                                ) : (
                                    <li className="py-4 pl-4 pr-5 text-sm leading-6">
                                        없음
                                    </li>
                                )}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ease-in-out duration-300">
                    <div className="bg-white p-6 rounded-md shadow-lg max-w-md mx-auto transform transition-transform duration-300 ease-in-out">
                        <h2 className="text-lg font-semibold mb-4">수정</h2>
                        <input
                            type="text"
                            name={editingField}
                            value={formData[editingField]}
                            onChange={handleInputChange}
                            className="border p-2 mb-4 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleSave}
                                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                저장
                            </button>
                            <button
                                onClick={handleCancel}
                                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
function EditableField({ label, field, value, openEditModal }) {
    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-semibold text-sm leading-6 text-gray-900">
                {label}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className="flex items-center">
                    <span className="flex-1">{value || '-'}</span>
                    {openEditModal && (
                        <svg
                            onClick={() => openEditModal(field)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="ml-2 w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5l11.732-11.732z"
                            />
                        </svg>
                    )}
                </div>
            </dd>
        </div>
    );
}
