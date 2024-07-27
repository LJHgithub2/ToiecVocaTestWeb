import React, { useEffect, useState } from 'react';
import { getProfile, uploadProfileImage } from '../services/profileService';
import { useAuth } from '../context/AuthContext';
import ProfileImage from '../components/profileImage';

export default function Profile() {
    const { user, setIsAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile(user.username);
                if (data) {
                    setProfile(data);
                } else {
                    // 인증실패
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log('Failed to fetch profile data.');
                setIsAuthenticated(false);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        console.log(profile);
    }, [profile]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profile_image', file);

            try {
                await uploadProfileImage(user.username, formData);
                window.location.reload();
            } catch (error) {
                console.log('Failed to upload image.');
                alert('이미지 변경에 실패하였습니다.');
            }
        }
    };

    const handleImageDelete = () => {
        console.log('이미지 삭제');
        // setImage('');
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
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="font-semibold text-sm leading-6 text-gray-900">
                            이름
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {profile
                                ? profile.lastname + profile.firstname
                                : '-'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-semibold leading-6 text-gray-900">
                            직업
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {profile ? profile.job : '-'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-semibold leading-6 text-gray-900">
                            성별
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {profile ? profile.gender : '-'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-semibold leading-6 text-gray-900">
                            자기 소개
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {profile ? profile.bio : '-'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-semibold leading-6 text-gray-900">
                            사용 단어장
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                {/* 디버깅용 로그 */}
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
        </div>
    );
}
