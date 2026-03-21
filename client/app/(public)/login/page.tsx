import { getSession } from '@/lib/get-session'
import { redirect } from 'next/navigation';
import { BrandSection } from '@/components/auth/pages/brandSection';
import { HeaderSection } from '@/components/auth/pages/header';
import { FooterSection } from '@/components/auth/pages/footer';
import { ManagerLoginForm } from '@/components/auth/pages/adminForum';

const   LoginPage  = async () => {
  const session=await getSession();
  if(session){
    redirect('/dashboard')
  }
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe,transparent_35%),linear-gradient(135deg,#f8fafc,#eff6ff_40%,#fff7ed)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col overflow-hidden md:flex-row md:p-6">
        <BrandSection />
        <section className="flex w-full items-center justify-center p-6 md:w-7/12 lg:w-1/2 md:p-12">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-2xl shadow-slate-200/80 backdrop-blur md:p-10">
            <div className="space-y-8">
              <HeaderSection mode="manager" />
              <ManagerLoginForm />
              <FooterSection />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default LoginPage
