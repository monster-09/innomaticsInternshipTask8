import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStudentStore } from '../store/useStudentStore';
import { Student } from '../types/student';

type StudentFormData = Omit<Student, 'id'>;

export function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<StudentFormData>();
  
  const addStudent = useStudentStore(state => state.addStudent);
  const updateStudent = useStudentStore(state => state.updateStudent);
  const student = useStudentStore(state => 
    state.students.find(s => s.id === Number(id))
  );

  useEffect(() => {
    if (isEditing && student) {
      reset(student);
    }
  }, [isEditing, student, reset]);

  const onSubmit = (data: StudentFormData) => {
    if (isEditing && id) {
      updateStudent(Number(id), data);
    } else {
      addStudent(data);
    }
    navigate('/students');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isEditing ? 'Edit Student Details' : 'Register New Student'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register('name', { required: 'Full name is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="student@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              {...register('age', { 
                required: 'Age is required',
                min: { value: 13, message: 'Age must be at least 13' },
                max: { value: 20, message: 'Age must be at most 20' }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <select
              {...register('class', { required: 'Class is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">Select Class</option>
              <option value="10th Grade">10th Standard</option>
              <option value="11th Grade">11th Standard</option>
              <option value="12th Grade">12th Standard</option>
            </select>
            {errors.class && (
              <p className="mt-1 text-sm text-red-600">{errors.class.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="Full address with city and state"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              {...register('phone', { 
                required: 'Mobile number is required',
                pattern: {
                  value: /^\d{3}-\d{3}-\d{4}$/,
                  message: 'Format: 999-999-9999'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="999-999-9999"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/students')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
          >
            {isEditing ? 'Update Details' : 'Register Student'}
          </button>
        </div>
      </form>
    </div>
  );
}