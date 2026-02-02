import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { RoleSelect } from './role-select/role-select';
import { RoleSelect2 } from './role-select2/role-select2';
import { About } from './about/about';
import { Privacy } from './privacy/privacy';
import { Terms } from './terms/terms';
import { Contact } from './contact/contact';
import { ForgotPassword } from './forgot-password/forgot-password';
import { StudentDashboard } from './student-dashboard/student-dashboard';
import { TeacherDashboard } from './teacher-dashboard/teacher-dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Quiz } from './pages/quiz/quiz';
import { Results } from './pages/results/results';
import { History } from './pages/history/history';
import { CreateQuiz } from './create-quiz/create-quiz';
import { TeacherMyQuizzes } from './teacher-my-quizzes/teacher-my-quizzes';
import { TeacherEditQuiz } from './teacher-edit-quiz/teacher-edit-quiz'; // 🔹 NEW

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'select-role', component: RoleSelect },
  { path: 'select-role2', component: RoleSelect2 },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'about', component: About },
  { path: 'privacy', component: Privacy },
  { path: 'terms', component: Terms },
  { path: 'contact', component: Contact },
  { path: 'forgot-password', component: ForgotPassword },

  { path: 'student-dashboard', component: StudentDashboard },
  { path: 'teacher-dashboard', component: TeacherDashboard },
  { path: 'admin-dashboard', component: AdminDashboard },

  { path: 'create-quiz', component: CreateQuiz },
  { path: 'quiz', component: Quiz },
  { path: 'results', component: Results },
  { path: 'history', component: History },

  { path: 'teacher-quizzes', component: TeacherMyQuizzes },

  // ✅ EDIT QUIZ ROUTE (IMPORTANT)
  { path: 'teacher/quizzes/:quizId/edit', component: TeacherEditQuiz },
  { path: 'teacher/quizzes/:quizId/view', component: TeacherEditQuiz },


  { path: '**', redirectTo: 'login' },
];
