import React, { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  fr: {
    app_name: 'Nexoria',
    app_tagline: 'Connectez-vous à votre compte',
    email_label: 'Adresse e-mail',
    email_placeholder: 'vous@exemple.com',
    password_label: 'Mot de passe',
    forgot_password: 'Mot de passe oublié ?',
    remember_me: 'Se souvenir de moi',
    sign_in: 'Se connecter',
    signing_in: 'Connexion en cours...',
    forgot_title: 'Mot de passe oublié',
    forgot_subtitle: 'Entrez votre e-mail pour recevoir un lien de réinitialisation',
    send_reset_link: 'Envoyer le lien de réinitialisation',
    sending_reset_link: 'Envoi en cours...',
    back_to_login: 'Retour à la connexion',
    reset_link_sent: 'Si cette adresse est associée à un compte, vous recevrez un e-mail avec un lien de réinitialisation.',
    invalid_credentials: 'Identifiants invalides. Veuillez réessayer.',
    admin_space: 'Espace Administration',
    student_space: 'Espace Étudiant',
    logout: 'Déconnexion',
    welcome: 'Bienvenue',
    role_admin: 'Administrateur',
    role_student: 'Étudiant',
    matricule: 'Matricule Étudiant',
    filiere: 'Filière',
    niveau: 'Niveau actuel',
    financial_status: 'Situation Financière',
    financial_desc: 'Suivi de mes échéances de paiement et montants restants dus',
    receipts: 'Mes Reçus de Paiement',
    receipts_desc: 'Consultation et téléchargement des reçus officiels générés',
    students_mgmt: 'Gestion des Étudiants',
    students_desc: 'Inscriptions administratives et consultations',
    fees_mgmt: 'Frais de Scolarité',
    fees_desc: 'Paramétrage des montants et tarifs applicables',
    schedules_mgmt: 'Échéanciers',
    schedules_desc: 'Planification des dates et tranches de paiement',
    reminders_mgmt: 'Gestion des Relances',
    reminders_desc: 'Suivi des échéances impayées et notifications',
    ready: 'Prêt',
    session_status: 'Statut de la session sécurisée (Sanctum)',
    err_network: 'Impossible de joindre le serveur. Vérifiez que le backend est allumé.',
  },
  en: {
    app_name: 'Nexoria',
    app_tagline: 'Log in to your account',
    email_label: 'Email address',
    email_placeholder: 'you@example.com',
    password_label: 'Password',
    forgot_password: 'Forgot password?',
    remember_me: 'Remember me',
    sign_in: 'Sign in',
    signing_in: 'Signing in...',
    forgot_title: 'Forgot password',
    forgot_subtitle: 'Enter your email to receive a reset link',
    send_reset_link: 'Send reset link',
    sending_reset_link: 'Sending...',
    back_to_login: 'Back to login',
    reset_link_sent: 'If an account is associated with this email, a reset link has been sent.',
    invalid_credentials: 'Invalid credentials. Please try again.',
    admin_space: 'Administration Portal',
    student_space: 'Student Portal',
    logout: 'Log out',
    welcome: 'Welcome',
    role_admin: 'Administrator',
    role_student: 'Student',
    matricule: 'Student ID',
    filiere: 'Major / Program',
    niveau: 'Current Level',
    financial_status: 'Financial Status',
    financial_desc: 'Track due payments, balances and payment installments',
    receipts: 'Payment Receipts',
    receipts_desc: 'View and download official generated payment receipts',
    students_mgmt: 'Student Management',
    students_desc: 'Student records, enrollment and details',
    fees_mgmt: 'Tuition & Fees',
    fees_desc: 'Configure applicable fees and rates',
    schedules_mgmt: 'Payment Schedules',
    schedules_desc: 'Plan due dates and payment installments',
    reminders_mgmt: 'Payment Reminders',
    reminders_desc: 'Track overdue installments and send reminders',
    ready: 'Ready',
    session_status: 'Secure session status (Sanctum)',
    err_network: 'Cannot connect to server. Please ensure backend is running.',
  },
  ar: {
    app_name: 'Nexoria',
    app_tagline: 'تسجيل الدخول إلى حسابك',
    email_label: 'البريد الإلكتروني',
    email_placeholder: 'vous@exemple.com',
    password_label: 'كلمة المرور',
    forgot_password: 'نسيت كلمة المرور؟',
    remember_me: 'تذكرني',
    sign_in: 'تسجيل الدخول',
    signing_in: 'جاري تسجيل الدخول...',
    forgot_title: 'نسيت كلمة المرور',
    forgot_subtitle: 'أدخل بريدك الإلكتروني لتلقي رابط إعادة التعيين',
    send_reset_link: 'إرسال رابط إعادة التعيين',
    sending_reset_link: 'جاري الإرسال...',
    back_to_login: 'العودة إلى تسجيل الدخول',
    reset_link_sent: 'إذا كان هناك حساب مرتبط بهذا البريد الإلكتروني، فقد تم إرسال رابط إعادة التعيين.',
    invalid_credentials: 'بيانات الاعتماد غير صالحة. يرجى المحاولة مرة أخرى.',
    admin_space: 'فضاء الإدارة',
    student_space: 'فضاء الطالب',
    logout: 'تسجيل الخروج',
    welcome: 'مرحباً',
    role_admin: 'مدير النظام',
    role_student: 'طالب',
    matricule: 'رقم الطالب (الماتريكول)',
    filiere: 'الشعبة / المسلك',
    niveau: 'المستوى الحالي',
    financial_status: 'الوضعية المالية',
    financial_desc: 'متابعة الدفعات المتبقية والمستحقات الدراسية',
    receipts: 'وصولات الأداء',
    receipts_desc: 'الاطلاع على وصولات الأداء الرسمية وتحميلها',
    students_mgmt: 'إدارة الطلبة',
    students_desc: 'تسجيل ومتابعة ملفات الطلبة',
    fees_mgmt: 'الواجبات الدراسية',
    fees_desc: 'ضبط وتحديد مبالغ الرسوم والمصاريف',
    schedules_mgmt: 'جدولة الدفعات',
    schedules_desc: 'تنظيم المواعيد النهائية وأقساط الأداء',
    reminders_mgmt: 'إدارة التذكيرات',
    reminders_desc: 'متابعة الأقساط المتأخرة وإرسال الإشعارات',
    ready: 'جاهز',
    session_status: 'حالة الجلسة المؤمنة (Sanctum)',
    err_network: 'تعذر الاتصال بالخادم. يرجى التأكد من تشغيل الباك إند.',
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('nexoria_lang') || 'fr'
  })

  useEffect(() => {
    localStorage.setItem('nexoria_lang', language)
    const root = document.documentElement
    if (language === 'ar') {
      root.setAttribute('dir', 'rtl')
      root.setAttribute('lang', 'ar')
    } else {
      root.setAttribute('dir', 'ltr')
      root.setAttribute('lang', language)
    }
  }, [language])

  const t = (key) => {
    return translations[language]?.[key] || translations.fr[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur de LanguageProvider')
  }
  return context
}
