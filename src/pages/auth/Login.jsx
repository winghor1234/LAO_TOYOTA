import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/Auth';
import { saveToken } from '../../utils/Token';
import { SuccessAlert } from '../../utils/handleAlert/SuccessAlert';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new URLSearchParams();
        data.append("phoneNumber", formData.phoneNumber);
        data.append("password", formData.password);

        try {
            const res = await login(data);
            const token = res.data.data.token;
            saveToken(token);
            navigate('/user/dashboard');

        } catch (error) {
            SuccessAlert("ມີບາຢ່າງຜິດພາດ!!!", "1500", "error");
            console.error("Login failed:", error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-red-300 to-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 shadow-lg p-8 bg-white rounded">
                <div>
                    <div className="mx-auto h-20 w-20 flex items-center justify-center">
                        <img
                            src="/src/assets/logo.jpg"
                            alt="Lao Toyota"
                            className="h-16 w-auto rounded-full"
                        />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        ເຂົ້າສູ່ລະບົບ
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ກະລຸນາເຂົ້າສູ່ລະບົບດ້ວຍບັນຊີຂອງທ່ານ
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Phone Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                ໂທລະສັບ
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="number"
                                    required
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="your phone number"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                ລະຫັດຜ່ານ
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>

                                <div className="appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus-within:ring-red-500 focus-within:border-red-500 focus-within:z-10 sm:text-sm focus-within:caret-red-500">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='w-full outline-none border-none '
                                        placeholder="password..."
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 " />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Remember me and forgot password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                ຈື່ຂ້ອຍໄວ້
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                                ລືມລະຫັດຜ່ານ?
                            </a>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${loading
                                ? 'bg-red-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                                } transition duration-150 ease-in-out`}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    ກຳລັງເຂົ້າສູ່ລະບົບ...
                                </div>
                            ) : (
                                'ເຂົ້າສູ່ລະບົບ'
                            )}
                        </button>
                    </div>

                    {/* Sign up link */}
                    <div className="text-center">
                        <span className="text-sm text-gray-600">
                            ຍັງບໍ່ມີບັນຊີ?{' '}
                            <a href="/register" className="font-medium text-red-600 hover:text-red-500">
                                ລົງທະບຽນທີ່ນີ້
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
