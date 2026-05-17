const features = [
    { name: '무료 단어장', description: '헤커스 토익 단어를 무료로 학습하세요.', icon: '📚' },
    { name: 'AI TTS 발음', description: 'AI 음성으로 정확한 영어 발음을 들어보세요.', icon: '🔊' },
    { name: '암기 모드', description: '뜻을 가리고 단어를 효율적으로 암기하세요.', icon: '🧠' },
    { name: '단어 추가', description: '나만의 단어를 직접 추가하고 관리하세요.', icon: '✏️' },
    { name: '일정 관리', description: '학습 일정을 체계적으로 계획하세요.', icon: '📅' },
    { name: '지속 업데이트', description: '꾸준히 개선되는 서비스를 경험하세요.', icon: '🚀' },
];

const stats = [
    { label: '수록 단어', value: '4,000+' },
    { label: '챕터', value: '30+' },
    { label: '학습 모드', value: '2가지' },
];

export default function Main() {
    return (
        <div className="space-y-12 animate-fade-in">
            {/* Hero */}
            <section className="text-center py-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    TOEIC 영단어 학습 플랫폼
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
                    토익 단어,{' '}
                    <span className="text-indigo-600">스마트하게</span>
                    <br />정복하세요
                </h1>
                <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                    JVT와 함께라면 토익 영단어 암기가 쉬워집니다.
                    AI 발음, 암기 모드, 체계적인 단어장으로 목표 점수를 달성하세요.
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-10 mt-10">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
                            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section>
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-slate-900">주요 기능</h2>
                    <p className="text-sm text-slate-500 mt-1">학습 효율을 높이는 다양한 기능을 제공합니다</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                        >
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <h3 className="font-semibold text-slate-900 mb-1.5">{feature.name}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery */}
            <section className="bg-white rounded-2xl border border-slate-200 p-8">
                <div className="text-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900">귀여운 랑랑이 🐱</h2>
                    <p className="text-sm text-slate-400 mt-1">공부하다 지치면 랑랑이를 보세요</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <img
                            key={i}
                            src={`/image/main/${i}.jpg`}
                            alt={`랑랑이 ${i}`}
                            className="rounded-xl object-cover w-full aspect-square"
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
