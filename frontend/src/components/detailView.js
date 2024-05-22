import { PaperClipIcon } from '@heroicons/react/20/solid'

const word = 
  {
    word: "apple",
    mean: "asdfafsdsfasfasdwqrwqrqrqwrqwrqwrqwrqwrqwrqwrqwrqwrqwfsfsdadfsdfasfsdfsadfㅇㄹ마ㅓ리ㅏㅁ니런아ㅓ린ㄹㄴㅇㄻㄹㄴㄹㄴㄹㄴㅇㄹ마ㅓ리ㅏㅁ니런아ㅓ린ㄹㄴㅇㄻㄹㄴㄹㄴㄹㄴsfsadfasfs",
    role: "ㅇㄹ마ㅓ리ㅏㅁ니런아ㅓ린ㄹㄴㅇㄻㄹsadasfasfasfasfasfasfasfasfasfafㄴㄹㄴㄹㄴㅁㄹㄴㅇ",
    associate : ['asfasf','asfasfasf','asfasfasf'],
    memo: "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu."
  }
;

export default function DetailView() {
  
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">상세보기</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{word.word}</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">단어</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{word.word}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">뜻</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{word.mean}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">품사</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{word.role}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">연관 단어</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{word.associate.join(', ')}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">메모</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {word.memo}
            </dd>
          </div>
        
        </dl>
      </div>
    </div>
  )
}