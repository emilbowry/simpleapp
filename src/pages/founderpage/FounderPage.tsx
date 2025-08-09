import React from "react";
import styles from "./FounderPage.module.css";
import { ExternalLink } from "lucide-react";
// Assume your images are in the assets folder and named appropriately
import founderImage from "/src/assets/joefennel.png";
// import backgroundPattern from 'src/assets/background.png';
import backgroundPattern from "/src/assets/background.png";
import growthHouseFavicon from "../../assets/growthhouselogo.png";
import globalstyles from "../../GlobalStyles.module.css";

const experienceData = [
	{
		title: "An Experienced Trainer",
		description:
			"Joe has run workshops on how to get more out of Generative AI tools with some of the biggest companies in the world through the Growth House 'AI for a Fast Start Program'.",
	},
	{
		title: "AI Ethicist",
		description:
			"Joe has studied the Ethics of AI at the University of Cambridge since 2020, culminating in being part of the university’s first ever MPhil in the Ethics of AI, Data and Algorithms.",
	},
];
// This is the hero section component
const FounderHero: React.FC = () => {
	return (
		<section className={styles.heroSection}>
			<div className={styles.heroContent}>
				<div className={styles.heroText}>
					<h1>Joe Fennell</h1>
					<p>Founder</p>
				</div>
				<div className={styles.heroImageContainer}>
					<img
						src={founderImage}
						alt="Joe Fennell"
						className={styles.heroImage}
					/>
				</div>
			</div>
		</section>
	);
};

// This is the main page component
const ExperienceSection: React.FC = () => {
	return (
		<section className={styles.experienceSection}>
			<div className={styles.experienceCard}>
				<h2 className={styles.experienceTitle}>Joe is</h2>
				<div className={styles.experienceList}>
					{experienceData.map((item, index) => (
						<div key={index} className={styles.experienceItem}>
							<div className={styles.itemNumber}>{index + 1}</div>
							<div className={styles.itemText}>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const ClientReviewsSection: React.FC = () => {
	return (
		<section className={styles.reviewsSection}>
			<h2 className={styles.reviewsTitle}>Client reviews</h2>
			<p className={styles.reviewsIntro}>
				For client reviews of Joe's prior AI training work, see the The
				Growth House's AI Programme page:
			</p>
			<a
				href="https://thegrowthhouse.com/ai-programme/"
				target="_blank"
				rel="noopener noreferrer"
				className={styles.reviewCardLink}
			>
				{/* This is the new graphic container that replaces the image */}
				<div className={styles.cardGraphicContainer}>
					<div className={`${styles.graphicBlock} ${styles.block1}`}>
						THE
					</div>
					<div className={`${styles.graphicBlock} ${styles.block2}`}>
						GROWTH
					</div>
					<div className={`${styles.graphicBlock} ${styles.block3}`}>
						HOUSE
					</div>
				</div>
				<div className={styles.cardTextContent}>
					<div className={styles.cardSiteInfo}>
						<img
							src={growthHouseFavicon}
							alt="The Growth House Favicon"
						/>
						<span>The Growth House</span>
					</div>
					<h3 className={styles.cardTitle}>
						AI Programme - The Growth House
					</h3>
					<p className={styles.cardDescription}>
						You shouldn't worry about being replaced by AI, you
						should worry about being replaced by someone who knows
						how to use AI better than you
					</p>
				</div>
				<ExternalLink className={styles.externalLinkIcon} />
			</a>
		</section>
	);
};

// --- Main Page Component (updated) ---
export const FounderPage: React.FC = () => {
	return (
		<div className={styles.founderPage}>
			<FounderHero />
			<div
				className={globalstyles.backgroundPattern}
				style={{ backgroundImage: `url(${backgroundPattern})` }}
			></div>
			{/* Add the new section here */}
			<ExperienceSection />
			<ClientReviewsSection />
		</div>
	);
};
