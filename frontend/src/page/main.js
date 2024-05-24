const features = [
  { name: "Created by Jonghyeon", description: "재밌음" },
  { name: "English Word Study", description: "토익 영단어 공부가능" },
  { name: "Effective Practice Test", description: "효율적인 모의 시험" },
  { name: "Free Wordbook", description: "토익 영단어 무료제공" },
  { name: "No Charge", description: "이런 엄청난 서비스가 무료" },
  { name: "ongoing development", description: "지속적인 개발 할 것" },
];

export default function Main() {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              JVT
            </h1>
            <p className="mt-4 text-gray-500">
              TOEIC 시험 대비를 손쉽게 준비하세요. JVT는 TOEIC 시험에서 가장
              흔히 출제되는 단어를 암기하는 데 도움이 되는 다양한 편의 기능을
              제공합니다. 단어뿐만 아니라 필수 문법 및 자주 사용되는 표현도
              습득할 수 있습니다. 주요 기능으로는 단어 탐색, 단어 퀴즈, 단어
              관리 등이 있습니다. JVT를 통해 TOEIC 시험에서 훌륭한 결과를
              얻어보세요
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div className="grid my-5 w-full text-center text-lg font-extrabold">
              귀여운 랑랑이
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <img
                src="/image/main/1.jpg"
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                className="rounded-lg bg-gray-100 object-cover w-full h-full"
              />
              <img
                src="/image/main/2.jpg"
                alt="Top down view of walnut card tray with embedded magnets and card groove."
                className="rounded-lg bg-gray-100 object-cover w-full h-full"
              />
              <img
                src="/image/main/3.jpg"
                alt="Side of walnut card tray with card groove and recessed card area."
                className="rounded-lg bg-gray-100 object-cover w-full h-full"
              />
              <img
                src="/image/main/4.jpg"
                alt="Walnut card tray filled with cards and card angled in dedicated groove."
                className="rounded-lg bg-gray-100 object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
