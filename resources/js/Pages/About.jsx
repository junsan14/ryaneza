
import Layout from "@/Layouts/Layout"
import about01 from '../../img/about01.webp'
import about02 from '../../img/about02.webp'
import about03 from '../../img/about03.webp'
import { Head } from "@inertiajs/react"
export default function About({auth}){
	return(
		<>
		<Layout>
			<div className="about others">
				<h1 className="main_title">ABOUT US</h1>
				<div className="about_content">
					<section className="about_content_section section">
						<h2 className="section_title">WHAT IS KURJYA</h2>
						<div className="about_content_section_flex">
							<p className="about_content_section_text">
								Welcome to [Your Service Name], the go-to platform for discovering the best dining experiences in Rwanda!
								With a user-friendly interface and trusted reviews, [Your Service Name] is 
								more than just a guide—it's a community where food lovers come together to celebrate 
								the vibrant flavors and hospitality that Rwanda has to offer.
								Whether you're looking for a cozy café, a bustling market stall, or an elegant restaurant, we're here to help you make every bite memorable.
								Join us in exploring the rich tapestry of Rwandan cuisine—one plate at a time!
							</p>
							<img src={about01} alt="" />
						</div>
					</section>
					<section className="about_content_section section">
						<h2 className="section_title">OUR MISSION</h2>
						<div className="about_content_section_flex">
							<img src={about02} alt="" />
							<p className="about_content_section_text">
								Our mission is to connect food enthusiasts with Rwanda's diverse culinary treasures,
								from hidden gems in local neighborhoods to the finest dining establishments. 
								We believe that every meal has a story, and we aim to make it easier for you to explore and share those stories.
							</p>
						</div>
					</section>
					<section className="about_content_section section">
						<h2 className="section_title">WHO ARE WE</h2>
						<p>
						</p>
					</section>
				</div>
			</div>
		</Layout>

		</>
		)
}