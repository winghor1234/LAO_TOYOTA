import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosInstance from '../../../utils/AxiosInstance';
import APIPath from '../../../api/APIPath';
import { SuccessAlert } from '../../../utils/handleAlert/SuccessAlert';


const addCarSchema = z.object({
  userId: z.string().min(1, 'ກະລຸນາເລືອກລູກຄ້າ'),
  model: z.string().min(1, 'ກະລຸນາປ້ອນຊື່ລົດ'),
  engineNumber: z.string().min(1, 'ກະລຸນາປ້ອນເລກຈັກ'),
  frameNumber: z.string().min(1, 'ກະລຸນາປ້ອນເລກຖັງ'),
  plateNumber: z.string().min(1, 'ກະລຸນາປ້ອນປ້າຍທະບຽນ'),
  province: z.string().min(1, 'ກະລຸນາປ້ອນແຂວງ'),
});

export const useAddCarForm = ({handleFetchCar, onClose}) => {
    const [users, setUsers] = useState([]);
    const { register,handleSubmit,formState: { errors },reset,} = useForm({resolver: zodResolver(addCarSchema),});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosInstance.get(APIPath.SELECT_ALL_USER);
                setUsers(res?.data?.data || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const onSubmit = async (data) => {
        try {
            await axiosInstance.post(APIPath.CREATE_CAR, data);
            handleFetchCar();
            onClose();
            SuccessAlert('ເພີ່ມຂໍ້ມູນລົດສຳເລັດ');
            reset();
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleBack = () => {
        reset();
        onClose();
    };


    return { register,handleSubmit,formState: { errors },users, onSubmit, handleBack, reset,  };
}