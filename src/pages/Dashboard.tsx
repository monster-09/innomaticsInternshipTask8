import { useStudentStore } from '../store/useStudentStore';
import { BarChart3, Users, GraduationCap } from 'lucide-react';

export function Dashboard() {
  const students = useStudentStore((state) => state.students);

  const stats = {
    total: students.length,
    byClass: students.reduce((acc, student) => {
      acc[student.class] = (acc[student.class] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Students Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">10th Standard</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.byClass['10th Grade'] || 0}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">12th Standard</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.byClass['12th Grade'] || 0}
              </p>
            </div>
            <GraduationCap className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Class Distribution</h2>
        <div className="space-y-4">
          {Object.entries(stats.byClass).map(([className, count]) => (
            <div key={className} className="flex items-center">
              <span className="w-32 text-sm text-gray-600">{className.replace('Grade', 'Standard')}</span>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-600 rounded-full"
                  style={{ width: `${(count / stats.total) * 100}%` }}
                />
              </div>
              <span className="ml-4 text-sm text-gray-600">{count} students</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}