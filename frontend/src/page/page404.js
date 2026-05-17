import { useNavigate } from 'react-router-dom';

export default function Page404() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="text-center animate-fade-in">
                <p className="text-7xl font-bold text-indigo-200 mb-4">404</p>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">페이지를 찾을 수 없습니다</h1>
                <p className="text-sm text-slate-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
}
