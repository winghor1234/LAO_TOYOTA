import { Eye, EyeOff, Lock, Phone } from 'lucide-react';
import { ForgotPasswordForm } from '../../component/schemaValidate/authValidate/ForgotPasswordValidate';


const ForgotPassword = () => {
    const { showPassword, setShowPassword, loading, register, handleSubmit, formState: { errors }, submitForm } = ForgotPasswordForm();

    return (
        <div className="bg-gradient-to-br from-red-300 to-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg space-y-8 shadow-lg p-8">
                <div className="mx-auto h-20 w-20 flex items-center justify-center">
                    <img src="/src/assets/logo.jpg" alt="Lao Toyota" className="h-16 w-auto rounded-full" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">ປ່ຽນລະຫັດຜ່ານ</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitForm)}>
                    <div className="space-y-4">
                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ໂທລະສັບ
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400 " />
                                </div>
                                <div className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500 focus-within:z-10 sm:text-sm focus-within:caret-red-500">
                                    <input
                                        {...register('phoneNumber')}
                                        type="number"
                                        className='w-full outline-none border-none focus:text-red-500'
                                        placeholder="phone number"
                                    />
                                </div>
                            </div>
                            <div className='h-6'>
                                {errors.phoneNumber && <span className='text-red-500 text-sm'>{errors.phoneNumber.message}</span>}
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ລະຫັດຜ່ານໃໝ່
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus-within:ring-red-500 focus-within:border-red-500 focus-within:z-10 sm:text-sm focus-within:caret-red-500">
                                    <input
                                        {...register('newPassword')}
                                        type={showPassword ? 'text' : 'password'}
                                        className='w-full outline-none border-none focus:text-red-500 '
                                        placeholder="new password"
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
                            <div className='h-6'>
                                {errors.newPassword && <span className='text-red-500 text-sm'>{errors.newPassword.message}</span>}
                            </div>
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
                                    ກຳລັງປ່ຽນລະຫັດຜ່ານ...
                                </div>
                            ) : (
                                'ປ່ຽນລະຫັດຜ່ານ'
                            )}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <span className="text-sm text-gray-600">
                        ມີບັນຊີແລ້ວ?{' '}
                        <a href="/login" className="font-medium text-red-600 hover:text-red-500">
                            ເຂົ້າສູ່ລະບົບ
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
