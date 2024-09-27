import { MainLayout, UserDetails } from "@/components/mod";
import style from "./user-details.module.css";

export default function Page() {
	return (
		<MainLayout>
			<section className="user-details">
        <div className="container grid h-full items-center">
          <UserDetails user={"test"}/>
        </div>
      </section>
		</MainLayout>
	);
}
