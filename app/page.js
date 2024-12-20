'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import LoadingModal from '../components/modal/loadingModal';
import LoginForm from '../components/login/LoginForm';
import AlertModal from '../components/modal/alertModal';

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [formData, setFormData] = useState({
    memberLoginId: '',
    memberPassword: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session) {
      router.push('/information');
    }
  }, [session, router]);

  useEffect(() => {
    setIsFormValid(
      formData.memberLoginId.length > 0 && formData.memberPassword.length > 0
    );
  }, [formData]);



  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await signIn('credentials', {
      memberLoginId: formData.memberLoginId,
      memberPassword: formData.memberPassword,
      redirect: false, 
    })
    setIsLoading(false);

    if (response.error) {
      setErrorMessage("아이디, 비밀번호를\n다시 확인해주세요")
      setTimeout(() => {
        setShowAlertModal(true);
      },0)
      setTimeout(() => {
        setShowAlertModal(false);
      },2000)
      return
    }

    router.push('/information');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen justify-center bg-cover" style={{backgroundImage: "url(/images/login-background.jpg)"}}>
      <div className="w-full shrink-0 px-6 pt-12 pb-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold color1 mb-3 text-center select-none">
            커스터마이징 카드 관리자 페이지
          </h1>
          <p className="text-base text-gray-900 text-center select-none">
            서비스 이용을 위해 로그인해주세요.
          </p>
        </div>
      </div>

      <div className="shrink-0">
          <div className="max-w-lg mx-auto px-5">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-center mb-8 select-none">로그인</h2>
              <LoginForm
                formData={formData}
                handleInputChange={handleInputChange}
                isFormValid={isFormValid}
                onSubmit={handleLogin}
              />
            </div>
          </div>
      </div>
      <LoadingModal message={"로그인 중입니다"} isOpen={isLoading} />
      <AlertModal title={"로그인 실패"} isOpen={showAlertModal} setIsOpen={setShowAlertModal} description={errorMessage} />
    </div>
  );
};

export default LoginPage;