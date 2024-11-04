import { useParams, useNavigate } from 'react-router-dom';
import { useStudentStore } from '../store/useStudentStore';
import { Mail, Phone, MapPin, User, GraduationCap, Calendar } from 'lucide-react';

export function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = useStudentStore(
    state => state.students.find(s => s.id === Number(id))
  );

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Student not found</h2>
        <button
          onClick={() => navigate('/students')}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Back to student list
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">{student.name}</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{student.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{student.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="text-gray-900">{student.age} years</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <GraduationCap className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="text-gray-900">{student.class}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 col-span-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900">{student.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => navigate('/students')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to List
            </button>
            <button
              onClick={() => navigate(`/edit/${student.id}`)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Edit Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}