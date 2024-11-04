import { create } from 'zustand';
import studentsData from '../data/students.json';
import { Student } from '../types/student';

interface StudentStore {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: number, student: Omit<Student, 'id'>) => void;
  deleteStudent: (id: number) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: studentsData,
  
  addStudent: (studentData) => set((state) => ({
    students: [
      ...state.students,
      {
        ...studentData,
        id: Math.max(...state.students.map(s => s.id), 0) + 1
      }
    ]
  })),

  updateStudent: (id, studentData) => set((state) => ({
    students: state.students.map(student =>
      student.id === id ? { ...studentData, id } : student
    )
  })),

  deleteStudent: (id) => set((state) => ({
    students: state.students.filter(student => student.id !== id)
  }))
}));