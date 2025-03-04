import SidebarNav from "@/components/SideBar";



const page = () => {
  return (
    <div className="flex">
      <SidebarNav/>
      <main className="flex flex-col w-full gap-7 md:px-36 md:py-12">
      </main>
    </div>
  );
}

export default page