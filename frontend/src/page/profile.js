import { useState } from "react";
var initialUser = {
  src: null,
  name: "이종현",
  job: "학생",
  sex: "남",
  introduce: "나는 좋아용",
  useWordBook: ["노랭이", "이투스", "해커스"],
};

export default function Profile() {
  const [user, setUser] = useState(initialUser);
  const [image, setImage] = useState(user.src);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage("");
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-3 bg-gray-100">
        <div className="flex items-start bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <div className="flex items-center w-full flex-col sm:flex-row">
            <div className="basis-1/3 flex justify-center">
              {image ? (
                <img
                  className="object-cover h-48 w-48 rounded-full border-2 border-gray-300"
                  src={image}
                  alt={user.name}
                />
              ) : (
                <div className="object-cover h-48 w-48 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="flex flex-col basis-2/3">
              <label className="block text-sm font-medium text-center py-3 text-gray-700">
                프로필 사진
              </label>
              <div className="flex sm:flex-col items-center justify-center gap-2">
                <button
                  className="w-40 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  프로필 사진 변경
                </button>
                <input
                  id="fileInput"
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
              {user.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              직업
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.job}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              성별
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.sex}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              자기 소개
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.introduce}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              사용 단어장
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                {user.useWordBook.map((wordBook, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                  >
                    <div className="flex w-0 flex-1 items-center">
                      <span className="ml-4 flex min-w-0 flex-1 truncate">
                        {wordBook}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
