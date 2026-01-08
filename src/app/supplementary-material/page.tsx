'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SupplementaryPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openSubSection, setOpenSubSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
    setOpenSubSection(null);
  };

  const toggleSubSection = (sub: string) => {
    setOpenSubSection(openSubSection === sub ? null : sub);
  };

  // FAQ Data - ALL Chapters
  const faqChapters = {
    "Chapter A: Origins of Dispute, Legality of Occupation and the Question of Plebiscite": [
      {
        question: "Q-A1: Is Kashmir an 'internal issue' of India or an International problem?",
        answer: "It was India itself which took Kashmir issue to UN under Chapter VI of UN Charter, which deals with resolution of international disputes. So, India from that point implicitly affirmed that Kashmir is an international dispute. UNSC resolutions have no expiry date and remain binding on its members. So attempts to bilateralize Kashmir dispute, or make Kashmir an internal issue of India has no legs to stand on.\n\nThis point is further explicitly corroborated by a long list of assurances made himself by the first Indian Prime Minister JawaharLal Nehru. Just quoting one relevant statement made J.L. Nehru on the floor of Indian Parliament in 1952\n\n\"It is an international problem. It would be an international problem anyhow if it concerned any other nation besides India and it does. It became further an international problem because a large number of other countries also took interest and gave advice…. We do not want to win people against their will and with the help of armed force, and if the people of Jammu and Kashmir State so wish it, to part company from us, they can go their way and we shall go our way. We want no forced marriages, no forced unions….\"\n\n—Prime Minister Jawaharlal Nehru in Parliament on August 7, 1952.",
        sources: [
          { title: "Chapter VI of UN Charter", url: "https://www.un.org/en/about-us/un-charter/chapter-6" },
          { title: "Jawaharlal Nehru Quote", url: "https://thewire.in/history/kashmir-domestic-international-history" }
        ]
      },
      {
        question: "Q-A2: India has not conducted plebiscite because Pakistan has to first vacate areas of erstwhile J&K under its control. How valid is this argument?",
        answer: "It's a completely invalid argument and does not accord with facts of the case.\n\nUNSC Resolution 47 called upon Pakistan to secure the withdrawal of its proxies, followed by a withdrawal of Indian troops. The UN would then establish a Plebiscite. But both India and Pakistan later signed UNSC Resolution 80 in March 1950 which reversed this by calling for simultaneous withdrawal of troops by both India and Pakistan. Then only, United Nations would conduct a plebiscite under its chosen commissioner.\n\nFurthermore, it was India which took Kashmir issue to UN under Chapter VI of UN Charter, which deals with resolution of international disputes. So, India from that point implicitly agreed that Kashmir is an international dispute. UNSC resolutions have no shelf life. So attempts to bilateralize Kashmir dispute, or make Kashmir an internal issue of India has no legs to stand on.",
        sources: [
          { title: "UNSC Resolution 47", url: "https://digitallibrary.un.org/record/111955/" },
          { title: "UNSC Resolution 80", url: "https://digitallibrary.un.org/record/112024?ln=en" },
          { title: "The Binding nature of UNSC resolutions", url: "https://ask.un.org/faq/15010" }
        ]
      },
      {
        question: "Q-A3: Why has India denied Plebiscite?",
        answer: "Instead of trying to flesh out possible intentions, it's better to learn the truth from the horse's mouth.\n\nWhen V.K. Menon, India's Minister for Defense and second most powerful man after Nehru, was asked why India refused plebiscite; he candidly declared:\n\n\"Because we would lose it. Kashmir would vote to join Pakistan and no Indian Government responsible to agreeing to the plebiscite could survive.\"\n\nFurther more, he conceded that\n\n\"There may be neither legal or moral justification for India's position on Kashmir, but the question was not what was right, but what was opportune.\"\n\n[Citation]: Arthur Tourtellot. \"Dilemma of a People Adrift.\" Saturday Review. March 6, 1965. p. 18",
        sources: []
      },
      {
        question: "Q-A4: When did India promise Kashmiris directly it will respect their will?",
        answer: "Pandit Jawaharlal Nehru at Joint press comm. of the PMs of India and Pak issued in Delhi after their meeting on 20 Aug 1953:\n\n\"People seem to forget that Kashmir is not a commodity for sale or to be bartered. It has an individual existence and its people must be the final arbiters of their future.\"\n\nPandit Jawaharlal Nehru speaking in the Indian Parliament, 12 Feb 1951:\n\n\"We have taken the issue to the UN and given our word of honour for a peaceful solution. As a great nation, we cannot go back on it. We have left the question for final solution to the people of Kashmir. And we are determined to abide by their decision.\"\n\nPandit Jawaharlal Nehru writing in Amrita Bazar Patrika, Calcutta, 2 Jan 1952:\n\n\"If, after a proper plebiscite, the people of Kashmir said, 'We do not want to be with India', we are committed to accept that. We will accept it though it might pain us. We will not send any army against them. We will accept that, however hurt we might feel about it, we will change the Constitution, if necessary.\"\n\nPandit Jawaharlal Nehru speaking in the Indian Parliament, 26 June 1952:\n\n\"I want to stress that it is only the people of Kashmir who can decide the future of Kashmir. It is not that we have merely said that to the United Nations and to the people of Kashmir; it is our conviction and one that is borne out by the policy that we have pursued, not only in Kashmir but every where.\n\nI started with the presumption that it is for the people of Kashmir to decide their own future. We will not compel them. In that sense, the people of Kashmir are sovereign.\"\n\nPandit Jawaharlal Nehru in Telegram No. Primin-304 dated 8 November 1947 addressed to Prime Minister of Pakistan:\n\n\"We have always right from the beginning accepted the idea of the Kashmir people deciding their fate by referendum or plebiscite. Ultimately, the final decision of settlement, which must come, has first of all to be made basically by the people of Kashmir\"",
        sources: []
      },
      {
        question: "Q-A5: What does United Nations say about Kashmir dispute?",
        answer: "Noteworthy UNSC resolutions with reference to J&K include the following:\n\nUNSC Resolution No. 47 adopted on 21 April 1948 which noted \"with satisfaction that both India and Pakistan desire that the question of the accession of Jammu and Kashmir to India or Pakistan should be decided through the democratic method of a free and impartial plebiscite…\". This resolution also recommended certain measures to be taken by both countries to create proper conditions for the plebiscite.\n\nUNSC Resolution No. 51 adopted on 3 June 1948 pursuant to which the Commission proposed a ceasefire and a proposed truce agreement as well as proposed that both countries should \"reaffirm their wish that the future status of the State of Jammu and Kashmir shall be determined in accordance with the will the people\" and \"agree to enter into consultations with the Commission to determine fair and equitable conditions whereby such free expression will be assured\".\n\nUNSC Resolution No. 91 adopted on 30 March 1951 which, amongst other things, observed that India and Pakistan have \"reaffirmed their desire that the future of the State of Jammu and Kashmir shall be decided through the democratic method of a free and impartial plebiscite conducted under the auspices of the United Nations\"; reminded \"the Governments and the authorities concerned of the principle embodied in its resolutions…, that the final disposition of the State of Jammu and Kashmir will be made in accordance with the will of the people expressed through the democratic method of a free and impartial plebiscite conducted under the auspices of the United Nations; affirmed that the convening of a constituent assembly [the J&K Constituent Assembly]… and any action that assembly might attempt to take to determine the future shape and affiliation of the entire State or any part thereof would not constitute a disposition of the State in accordance with the above principle\"; and declared the \"belief that it is the duty of the Security Council in carrying out its primary responsibility for the maintenance of international peace and security to aid the parties to reach an amicable solution of the Kashmir dispute and that a prompt settlement of this dispute is of vital importance to the maintenance of international peace and security\".",
        sources: [
          { title: "UNSC Resolution 47", url: "http://unscr.com/en/resolutions/doc/47" },
          { title: "UNSC Resolution 51", url: "http://unscr.com/en/resolutions/doc/51" },
          { title: "UNSC Resolution 91", url: "http://unscr.com/en/resolutions/doc/91" }
        ]
      }
    ],

    "Chapter B: Instrument of Accession, its illegality and temporary nature, violation of its conditions and supersedence by UN mandated plebiscite": [
      {
        question: "Q-B1: Kashmir's King acceded to India, therefore Kashmir belongs to India. How valid is this assertion?",
        answer: "It's a completely invalid argument in its every detail. The King was not Kashmiri. The accession was temporary and meant to be ratified by referendum. And India even violated conditions of Instrument of Accession in its temporary set-up before the supposed plebiscite.\n\nNote: Before we come to terms with conditions stipulated in the accession, it's useful reminder that King was not Kashmiri at all but a despot of Dogra ethnicity who Kashmiris were fighting tooth and nail against. Thus, he had no legitimacy to decide on the behalf of people of Kashmir in any case as he didn't represent the democratic will of Kashmiris.\n\nThe accession itself was temporary and subjected to referendum- and was regarded as such by every important actor involved in it at that time.\n\nLord Mountbatten when receiving the letter of Accession wrote back to Dogra Maharaja Hari Singh:\n\n\"It is my Government's wish that as soon as law and order have been restored in Kashmir and her soil cleared of the invader the question of the state's accession should be settled by a reference to the people.\"\n\n-Source: P. L. Lakhampal. Essential Documents and Notes on Kashmir Dispute, International Publications, New Delhi, 1958, p. 56.\n\nThis sentiment was further echoed by India's Prime Minister Pandit Nehru umpteen times.\n\n\"...our assurance that we shall withdraw our troops from Kashmir as soon as peace and order is restored and leave the decision regarding the future of the State to the people of the State is not merely a promise to your Government but also to the people of Kashmir and to the world.\"\n\n-(Jawahar Lal Nehru, Telegram No. 25, October 31, 1947, to Liaqat Ali Khan, PM of Pakistan)\n\n\"We have always right from the beginning accepted the idea of the Kashmir people deciding their fate by referendum or plebiscite. Ultimately, the final decision of settlement, which must come, has first of all to be made basically by the people of Kashmir\"\n\n-(Pandit Jawaharlal Nehru in Telegram No. Primin-30 4 dated 8 November 1947 addressed to Prime Minister of Pakistan)\n\n\"I should like to make it clear that question of aiding Kashmir in this emergency is not designed in any way to influence the State to accede to India.\"\n\n- Telegram dated 26 October 1947 to the British Prime Minister, Clement Attlee and repeating the same telegram (Telegram 402 Primin-2227) on October 27, 1947, to the Prime Minister of Pakistan.\n\nSheikh Abdullah himself further corroborated it in speech at floor of UN general assembly in following words:\n\n\"India does not want to take advantage of the difficult situation in Kashmir. We will accept this accession because without Kashmir's acceding to the Indian Dominion we are not in a position to render any military help. But once the country is free from the raiders, marauders and looters, this accession. will be subject to ratification by the people. That was the offer made by the Prime Minister of India\".\n\nEven letter of Accession itself notes the temporary nature of Accession in following points:\n\nPoint 8: Nothing in this Instrument shall be deemed to commit in any way to acceptance of any future constitution of India or to fetter my discretion to enter into agreement with the Government of India under any such future constitution.\n\nPoint 9: Nothing in this Instrument affects the continuance of my Sovereignty in and over this State, or, save as provided by or under this Instrument, the exercise of any powers, authority and rights now enjoyed by me as Ruler of this State or the validity of any law at present in force in this State.\n\nIndia later took the dispute to UN Security Council under Chapter VI of UN Charter which also ruled in the favor of impartial plebiscite. See UNSC resolutions numbered 47, 51, 80, 91.\n\nIndia has since unilaterally denied the plebiscite, used the temporary accession to take control of Kashmir and entirely subjugate it through violent military occupation. Not to mention that India has even violated conditions stipulated within the letter of Accession itself which only granted it power in three areas viz Defense, Communications and Foreign affairs and killed any autonomy it had to grant in this temporary set-up.",
        sources: [
          { title: "Instrument of Accession", url: "https://en.wikipedia.org/wiki/Instrument_of_Accession_(Jammu_and_Kashmir)" },
          { title: "UNSC Resolution 47", url: "https://undocs.org/S/RES/47(1948)" },
          { title: "UNSC Resolution 51", url: "https://undocs.org/S/RES/51(1948)" },
          { title: "UNSC Resolution 80", url: "https://undocs.org/S/RES/80(1950)" },
          { title: "UNSC Resolution 91", url: "https://undocs.org/S/RES/91(1951)" }
        ]
      }
    ],

    "Chapter C: Profiling the sentiment of Freedom of Kashmiri Population": [
      {
        question: "Q-C1: Considering Kashmiris launched insurgency in 1990s, were they in support of or okay with Indian rule before that?",
        answer: "No.\n\nOnce again, No. Overwhelming majority of Kashmiris have never accepted the Indian rule/occupation of Kashmir.\n\nJayaprakash Narayan, seminal Indian Independence leader popularly known as Lok Nayak, while travelling through Kashmir wrote to Nehru in a letter, dated 1 May, 1956:\n\n\"From all the information I have, 95 percent of Kashmiri Muslims don't wish to be or remain indian citizens. I doubt therefore the wisdom of trying to keep people by force where they wish not to stay. This cannot but have serious long-term political consequences.... I do earnestly wish that this question be considered more from a human: rather than a nationalist point of view.\"\n\n-Bimal Prasad (ed.), Selected Works of Jayaprakash Narayan; Vol. 7; Manohar; page 115.\n\nThe same thought was echoed in different words by second most powerful leader of India during its early Independence days, V.K. Menon, the then Minister for Defense of India. When he was asked why India refused plebiscite; he candidly declared:\n\n\"Because we would lose it. Kashmir would vote to join Pakistan and no Indian Government responsible to agreeing to the plebiscite could survive.....There may be neither legal or moral justification for India's position on Kashmir, but the question was not what was right, but what was opportune.\"\n\n-Arthur Tourtellot. \"Dilemma of a People Adrift.\" Saturday Review. March 6, 1965. p. 18\n\nKashmir was relatively peaceful pre 90s. But it was an era when Kashmiri population bore the brunt of extreme political excesses without retaliating back with reciprocal violence. The wounds that Kashmiri nation bore in this period would water the revolution that followed just after.\n\nIndian state started relentlessly pursuing arrests of Kashmiris from the very start. Even tiniest of 'misbehaviours' landed people in jail.\n\n\"Listening to Radio Pakistan was prohibited; and any preson doubted of listening to it, was arrested alongwith the radio-set\" - Kashmir in Flames, pg. 49\n\nIn 1953, When Nehru arrested Sheikh Abdullah for hobnobbing with American Ambassador to hatch a plan for Kashmiri Independence, massive revolts started across Kashmir which were fiercely put down, resulting in over 1500 people killed. Nehru tried to downplay the incident as \"few small protests\" in Kashmir while speaking to Lok Sabha on Aug 10, 1953.\n\nAfter Abdullah's arrest, Mirza Mohammad Abdul Beg formed the Plebiscite Front demanding for the Plebiscite Rule. India consdered Plebiscite Front as a deep threat and would later ban the Front in 1971 under Indira Gandhi.\n\nIndian state operated without legitimacy among the people. Only permissible politics was to toe the line of the state to the T. J&K government sought to extinguish anti-Indian elements in Kashmir, which put it against an overwhelming majority of Kashmiri people.\n\n\"Should not the scale of that sentiment be explained by the fact that the state let loose the Peace Brigade — Khoftan Faqir, as the commoners called them, a mixture of political workers and thugs and all sorts of anti-social elements — to do as they like, and target any dissent against the regime.\" - (Kashmir in Chains, pg. 386).\n\n\"All sorts of torture were employed against the anti-Indians, and so the name of Qadir Ganderbali, head of the police's Special Staff, achieved notoriety across Kashmir.\" - (Dynamics of Political Change in Kashmir: From Ancient to Modern Times, pg. 179)\n\n\"There are signs of the establishment of a police state—futile notices in restaurants forbidding political conversations when everybody talks politics; more 'Public Safety' prisoners than are necessary.\" - The Statesman, March 1st, 1949\n\n1987 was just a breaking point.\n\nA cinematic explosion after a volcano brewing underneath the surface of Kashmiri body-politic erupted for the world to see. It was a moment of realization for Kashmiri nation that their deep held beliefs and sentiments would court no listeners until they are backed by the barrel of a gun. The seeds of insurgency has long been planted by then.\n\nOn 29 September 1965, decades before the insurgency would erupt, thousands of students gathered hand in hand and marched to the UN HQ and proclaimed the following resolution.\n\n\"We shall fight in the schools, we shall fight in the colleges, we shall fight in the streets, we shall fight in the villages, we shall fight in the towns, but we shall never submit before the might of Indian imperialism. Either we shall perish or we will triumph\" - (Kashmiris Fight for Freedom, vol. II, pg. 1263.)\n\n\"Although the Plebiscite Front already existed since long, demanding a referendum, the Kashmiri youth had already taken to radicalism. Throughout the end of 1965, massive student protests spread across, with participation of both men and women. Many were killed in firing. The military barged into the vicinity of Hazratbal. The Plebiscite Front leadership came out in support only later, and the whole affair was followed by a spree of arrests, of students, and of Plebiscite Front leadership.\" - (Kashmiris Fight for Freedom, vol. II, 1263–6; Nida-i-Haq, pg. 323.)\n\n\"The students and youth went on to form a hierarchical string of cells, headed by the Master Cell, to launch covert operations against India. The cells organized protests, printed and issued posters, ferried weapons and taught their usage, and facilitated infiltration across the Ceasefire Line.\" - (India, Pakistan and the Secret Jihad, pg. 58–9)\n\n\"By 1965, on one side of the LoC, the National Liberation Front had been formed by Amanullah Khan and Maqbool Bhat, while on the other side, by 1968, posters of a map of India with Kashmir in red, as a separate entity, were being mailed to different people, and a low-profile political resistance organisation, Jammu Kashmir Revolutionary Front, had been launched in Srinagar. A group styled after the Palestinian Al-Fatah had emerged by late 1968, and with it, armed struggle began in Kashmir.\" - (Making of Al'Fatah, Farman Ali)",
        sources: [
          { title: "1953 Protests", url: "https://archives.kdischool.ac.kr/bitstream/11125/40875/1/The%20Uprising%20in%20Kashmir.pdf" },
          { title: "The Legacy Of Khuftan Fakirs And Goggas", url: "https://countercurrents.org/2018/03/the-legacy-of-khuftan-fakirs-and-goggas-a-peep-into-the-past/" },
          { title: "Plebiscite Front", url: "https://en.wikipedia.org/wiki/All_Jammu_and_Kashmir_Plebiscite_Front" },
          { title: "Making of Al Fatah", url: "https://www.researchgate.net/publication/270439378_Making_of_Al'Fatah_Kashmir_Armed_Resistance" }
        ]
      }
    ]
  };

  // External Links Data
  const externalLinks = {
    "Kashmir 101": [
      { title: "Kashmir: A Historical Timeline", url: "https://web.archive.org/web/20230220052717/https://adimagazine.com/articles/kashmir-a-historical-timeline/" },
      { title: "Deconstructing Kashmiriyat", url: "https://web.archive.org/save/https://freepresskashmir.news/2018/01/30/deconstructing-kashmiriyat-a-myth-woven-around-history/" },
      { title: "History of betrayals in Kashmir", url: "https://web.archive.org/save/https://frontline.thehindu.com/cover-story/kashmir-history-of-betrayals/article29053014.ece" },
      { title: "From Domicile to Dominion: India's Settler Colonial Agenda in Kashmir - Harvard Law Review", url: "https://web.archive.org/save/https://harvardlawreview.org/2021/05/from-domicile-to-dominion-indias-settler-colonial-agenda-in-kashmir/" },
      { title: "The life and times of Maqbool Bhat", url: "https://www.wandemag.com/the-life-and-times-of-maqbool-bhat-part-one/" },
      { title: "UNSC Resolution 47", url: "https://digitallibrary.un.org/record/111955/" },
      { title: "UNSC Resolution 80", url: "https://digitallibrary.un.org/record/112024?ln=en" },
      { title: "In Pursuit of a Nation: Conflicting Formulations of Nationalism in the Princely State of Jammu and Kashmir", url: "https://web.archive.org/save/https://www.inversejournal.com/2019/03/16/in-pursuit-of-a-nation-conflicting-formulations-of-nationalism-in-the-princely-state-of-jammu-and-kashmir-1930-1940-by-gowhar-yaqoob/" },
      { title: "Public Safety Act: The making and unmaking of the Dangerous Individual in Kashmir", url: "https://web.archive.org/web/20210118041704/https://cafedissensus.com/2017/02/20/public-safety-act-the-making-and-unmaking-of-the-dangerous-individual-in-kashmir/" },
      { title: "An Essential Guide To Kashmir's Special Status: Part I", url: "https://web.archive.org/save/https://raiot.in/dismantling-370-in-kashmir-part-1/" },
      { title: "An Essential Guide To Kashmir's Special Status: Part II", url: "https://web.archive.org/save/https://raiot.in/dismantling-370-in-kashmir-part-2/" },
      { title: "An Essential Guide To Kashmir's Special Status: Part III", url: "https://web.archive.org/save/https://raiot.in/constitutional-lies-and-the-afterlives-of-law-in-kashmir/" }
    ],
    
    "Kashmiri Chronicles": [
      { title: "Aleph Se Azadi - Uzma Falak", url: "https://web.archive.org/save/http://kindlemag.in/aleph-se-azadi/#_edn1" },
      { title: "The English Education of a Kashmiri - Ashaq Parray", url: "https://web.archive.org/save/https://www.theindiaforum.in/article/english-education-kashmiri" },
      { title: "That Home in Our Heart: An Allegory of a Struggle Against Forgetting in Kashmir - Muzamil Jaleel", url: "https://web.archive.org/save/https://www.inversejournal.com/2020/08/04/that-home-in-our-heart-an-allegory-of-a-struggle-against-forgetting-in-kashmir-by-muzamil-jaleel/" },
      { title: "The Shapes of Stones - Niya Shahdad", url: "https://web.archive.org/save/https://harpers.org/2018/12/the-shapes-of-stones/" },
      { title: "The Imaginarium of Rahul Pandita - Arif Ayaz Parrey", url: "https://web.archive.org/save/http://kindlemag.in/the-imaginarium-of-rahul-pandita/" },
      { title: "A War Against Words - Hilal Mir", url: "https://web.archive.org/save/https://adimagazine.com/articles/war-against-words/" },
      { title: "The fears of settler colonialism - Arif Ayaz Parrey", url: "https://web.archive.org/web/20210520160704/http://www.wandemag.com/kashmir-banega-palestine/" },
      { title: "The Geopolitics of the Oppressed - Mohamad Junaid", url: "https://web.archive.org/save/https://adimagazine.com/articles/geopolitics-of-the-oppressed/" },
      { title: "'Kuka…..Wane cha Zulm'?", url: "https://web.archive.org/save/https://rumblingreporter.wordpress.com/2013/02/20/kuka-wane-cha-zulm-2/" },
      { title: "False Flags: The Indian Army's secretive role in hyper-nationalist protests in Kashmir", url: "https://www.reddit.com/r/Kashmiri/comments/vbxjc6/false_flags_the_indian_armys_secretive_role_in/" }
    ],

    "HR Reports Kashmir": [
      { title: "Stoke White Investigations - India's War Crimes in Kashmir: Violence, Dissent and the War on Terror, 2022", url: "https://web.archive.org/web/20230220054258/https://www.swiunit.com/post/india-s-war-crimes-in-kashmir-violence-dissent-and-the-war-on-terror" },
      { title: "JKCCS - Reports on violence and torture in Kashmir", url: "https://web.archive.org/save/https://jkccs.wordpress.com/" },
      { title: "APDP - Reports", url: "https://web.archive.org/save/https://apdpkashmir.com/category/reports/" },
      { title: "UNHCHR 2018 Report", url: "https://www.ohchr.org/Documents/Countries/PK/DevelopmentsInKashmirJune2016ToApril2018.pdf" },
      { title: "UNHCHR 2019 Report", url: "https://www.ohchr.org/Documents/Countries/IN/KashmirUpdateReport_8July2019.pdf" },
      { title: "Human Rights Watch Kashmir documentation and reports", url: "https://www.hrw.org/tag/kashmir" },
      { title: "Behind the Kashmir 'Conflict' - HRW report", url: "https://www.hrw.org/reports/1999/kashmir/" },
      { title: "Gendered Violence in Kashmir - APDP", url: "https://kafilabackup.files.wordpress.com/2011/07/half-widow-half-wife-apdp-report.pdf" },
      { title: "Key Human Rights Issues of Concern in Indian-administered Jammu and Kashmir - FIDH", url: "https://www.fidh.org/IMG/pdf/20190315_kashmir_briefing_note_-_final.pdf" },
      { title: "Alleged Perpetrators: Stories of Impunity in Jammu and Kashmir - JKCSS", url: "https://jkccs.files.wordpress.com/2017/05/alleged-perpetrators.pdf" },
      { title: "Amarnath Yatra: A Militarized Pilgrimage - JKCSS", url: "https://jkccs.files.wordpress.com/2017/05/amarnath-report-2017.pdf" },
      { title: "The Kunan Poshpora Mass Rape Case: Notes from a Hearing", url: "https://web.archive.org/save/http://www.warscapes.com/reportage/kunan-poshpora-mass-rape-case-notes-hearing" }
    ],

    "From the Pages of History": [
      { title: "Understanding Kashmiri - Walter R Lawrence's speech in Westminster Townhall - 1895", url: "https://kashmirlife.net/understanding-kashmiri-issue-37-vol-09-159013/" },
      { title: "Manto's Letter to Nehru - 1954", url: "https://kashmirlife.net/mantos-letter-nehru-131771/" },
      { title: "The Ghat of the Only World - 2002", url: "https://www.amitavghosh.com/aghashahidali.html" },
      { title: "Maqbool Bhat's Letter to Mian Sarwar", url: "https://web.archive.org/save/https://maqboolreborn.wordpress.com/2020/07/13/letter-8-maqbool-to-mian-sarwar/" }
    ],

    "Beyond the Conflict": [
      { title: "The Art and Science of Kashmir's Pink Tea - AtlasObscura", url: "https://www.atlasobscura.com/articles/kashmir-pink-tea" },
      { title: "Of Taaq and Dhajji Dwaris: The romance of Kashmiri wooden architecture", url: "https://www.stirworld.com/inspire-visits-of-taaq-and-dhajji-dwaris-the-romance-of-kashmiri-wooden-architecture" },
      { title: "The Story of Boxes", url: "https://gaatha.com/kari-kalamdani-papier-mache-painting-kashmir/" }
    ]
  };

  // Recommended Books Data (from r/Kashmiri)
  const recommendedBooks = {
    "Pre-Historic": [
      "Prehistoric burials of Kashmir - by AK Sharma (1998) | Archaeology",
      "Prehistoric Kashmir - by Aijaz A Bandey (2009) | Archaeology"
    ],
    
    "Ancient": [
      "Ancient Monuments of Kashmir - by Ram Chandra Kak (1933) | History | Architecture",
      "Memoirs of the archaeology of Kashmir - by R.C. Kak (1924) | History | Archaeology",
      "Illustrations of ancient buildings in Kashmir - by Cole, Henry Hardy (1869) | History | Art",
      "Ancient Geography of Kashmir - by M.A. Stein (1899) | History | Geography",
      "Art and Architecture of Ancient Kashmir - by Pal, Pratapaditya (1989) | Art | History",
      "Early History and Culture of Kashmir - by S.C. Ray (1957) | History | Culture",
      "The Hindu-Buddhist Sculpture of Ancient Kashmir and Its Influences - by John Siudmak (2013) | History | Art",
      "The Making of Early Kashmir - by Ashraf Wani (2023) | History",
      "Ancient Coinage of Kashmir - by Alexander Cunningham (1891) | Art | History",
      "Essay on the Arian Order of Architecture - by Alexander Cunningham (1848) | Art | Archaeology",
      "Studies in the History and Art of Kashmir and the Indian Himalaya - by Goetz (1969) | Art | History",
      "Introduction du Buddhisme dans le Kashmir - by Leon Feer | Article | Religion | History",
      "Buddhists of Kasmir - by Jean Naudou (1980) | General | History | Religion",
      "Northern India according to Shui-Ching-Chu - by Petech (1950) | History | Cross-regional | Secondary source",
      "Si-yu-ki or 'The Records of the Western World' - by Hsuan Tsang | Primary source",
      "Nilamata Purana (Kashmira Mahatmya)"
    ],
    
    "Medieval": [
      "The Beginnings of Mediaeval Art in Kashmir - by Goetz (1952) | History | Art",
      "Kalhana's Rajatarangini Vol 1, Vol 2 - by M. A Stein (1900) | History",
      "Kashmir under the Loharas - by Krishna Mohan (1958) | History",
      "Kashir - by GMD Sufi (1949) | History | General",
      "Kashmir under the Sultans - by Mohibbul Hassan (2005) | History",
      "Syncretic traditions of islamic religious architecture of Kashmir - by Hakeem Sameer Hamdani (2021) | History | Architecture",
      "Nund Rishi: Poetry and Politics in Medieval Kashmir - by Abir Bazaz (2024) | History | Religion",
      "Around Abhinavagupta: Aspects of the Intellectual History of Kashmir from the Ninth to the Eleventh Century - by Eli Franco and Isabelle Ratié | History | Religion",
      "Sufism in Kashmir: From 14th Century to 16th Century - by Abdul Qayoom Rafiqi | History | Religion",
      "Kasmir, Tang China, and Muktapida Lalitaditya's Ascendancy over the Southern HinduKush region - by Tansen Sen | Article | History | Cross-regional",
      "Akbar and Kashmir - by Ashraf Wani | Article | History",
      "An Itinerary in Khotanese Saka - by H. W. Bailey (appeared in Acta Orientalia in 1936) | Article | History | Primary source",
      "Kitab Muruj al-Dhahab wa Ma'adin al-Jawhar - by Mas'udi",
      "Futuh al-Buldan - by Balazuri",
      "Kitab Ahsan al-Taqasim fi Ma rifat al-Aqalim - by Muqaddasi",
      "Kitab Nuzhat al-Mushtaq fi Khitraq al-Afaq - by Idrisi",
      "Jami al-Tawariqh - by Rashid al-Din",
      "Kitab ul-Hind - by Al-Beruni",
      "Tarikh i Rashidi - by Mirza Haider Daughlat",
      "Ain i Akbari - by Abu Fazli",
      "Travels of Marco Polo - by Marco Polo",
      "Kathākautuka of Shrivara"
    ],

    "Pre-Modern": [
      "Shi'ism in Kashmir: A history of Shia-Sunni Rivalry and reconciliation - by Hakeem Sameer Hamdani (2022) | History | Religion | Politics",
      "In This Corner of the Entangled Cosmopolises: Political Legitimacies in the Multilingual Society of Sultanate and Early Mughal Kashmir - by Satoshi Ogura (2020) | Article | History | Language | Politics",
      "Kashmiri Brahmins (pundits) upto 1930: Cultural change in the cities of North India - by Henriette M. Sender (1981) | General | History | Cross-regional | Culture",
      "Baharistan i Shahi - by Anonymous (1614)",
      "Tarikh i Kashmir - by Haider Malik Chadurah (1621)",
      "Mukhtasir i-tarikh i-Kashmir - by Narayan Koul",
      "Valley of Kashmir - by Walter Lawrence (1895) | Biography | Politics",
      "Hindu Rulers Muslim subjects - by Mridu Rai (2004) | History | Politics",
      "British Paramountcy In Kashmir 1876-1894 - by Madhavi Yasin | History | Politics",
      "Wrongs of Kashmir - by Arthur Brinkman (1870) | Primary source",
      "Kashmir Mismanagement - by Robert Thorpe (1870) | Primary source",
      "Precious threads and Precarious lives - by Amit Kumar (2022) | History | Culture",
      "Travels in the Panjab, Afghanistan, & Turkistan - by Mohan Lal (1846) | History | Culture",
      "Where Three Empires Meet - by E.F Knight (1893)",
      "Kashmir - by Sir Francis Younghusband (1909)",
      "Travels in Kashmir and the Punjab - by Baron Charles von Hugel (1845)",
      "Gazetteer Of Kashmir - by Bates, Charles Ellison",
      "Travels In Kashmir, Ladak, Iskardo Vol.1&2 - by Vigne, G. T. (1844)",
      "Gazetteer of Kashmir and Ladak - by Elmslie (1890)",
      "A Journey From Bengal to England, Through the Northern Part of India, Kashmire, Afghanistan and Persia (1798-1808)",
      "Travels in the Himalayan Provinces of Hindustan and the Punjab - by Moorcroft (1841)",
      "Letters from India: Describing a Journey in the British Dominions of India, Tibet, Lahore, and Cashmeer (1828-1831) - by Jacquemont (1835)",
      "Notice to the Himmaleh Mountains and the Valley of Kashmir - by B.C. Hugel (1835)",
      "Travels in the Mughal empire - by Francois Bernier (1891)"
    ],

    "Modern": [
      "Understanding Kashmir and Kashmiris - by Christopher Snedden (2015) | History | Politics",
      "Kashmir: The Unwritten History - by Christopher Snedden (2013) | History | Politics",
      "Language of Belonging - by Zutshi (2004) | General | Politics",
      "Kashmir in Conflict: India, Pakistan and the unending war - by Victoria Schofield (2000) | General | History",
      "Kashmir: History, Politics and Representation - by Zutshi (2008) | History | Politics",
      "Territory of Desire - by Kabir (2009) | General | History",
      "The Many faces of Kashmiri Nationalism - by Nandita Haksar (2015) | Politics",
      "Islamic Shangri la - by David G. Atwell (2018) | Cross-regional | History | Politics",
      "Kashmir fights for freedom Vol 1, 1819-1946 - by Yusuf Saraf (1977) | History | Politics",
      "The Making of Modern Kashmir - by Altaf Hussain Para (2018) | History | Politics",
      "The Kashmir Shawl - by John Irwin (1973) | Culture",
      "Two nations and Kashmir - by Birdwood (1956) | Politics | History",
      "Muqaddame'e Kashmir - by Sardar Abdul Qayyum (1987) | Primary source | Politics",
      "Without Baggage: A personal account of the J&K operations from October 1947 to January 1949 - by Lt Gen EA Vaz (1987) | Primary source | Military",
      "Withering Chinar - by M.A Haq Mirza (1991) | Primary source | Military",
      "A Mission in Kashmir - by Andrew Whitehead (2007) | History | Politics",
      "Kashmir Saga - by Sardar Ibrahim Khan (1965) | Primary source | Politics",
      "The Options in 1947 - by H. L Scott | Primary source | Politics",
      "Jammu and Kashmir State in 1946-47: Dilemma of accession - by R. C Kak (2017) | Primary source | Politics",
      "The Gilgit Rebellion - by Major Browns (1995) | Primary source | Military",
      "Partition Observed: British Official Reports from South Asia Vol 1 & Vol 2 - by Lionel Carter | Primary source | Politics",
      "Weakened States Seeking Renewal: British Official Reports from South Asia - by Lionel Carter | Primary source | Politics",
      "Completing the First Year of Independence: British Official Reports from South Asia - by Lionel Carter | Primary source | Politics",
      "Towards a Ceasefire line: British Official reports from South Asia - by Lionel Carter (2018) | Primary source | Politics",
      "Slender was the thread: Kashmir Confrontation - by L. P Sen (1994) | Primary source | Military",
      "Nehru's Emissary to Kashmir - by Major General Hiralal Attal (1972) | Primary source | Politics",
      "Historical title, Self-determination and the Kashmir question - by Fozia Lone (2018) | History | Politics",
      "Kashmakash - by Ghulam Abbas (2001) | Primary source | Politics",
      "Raiders in Kashmir - by Major General Akbar Khan (1975) | Primary source | Military",
      "The history of kashmir dispute: An aspect of India-Pakistan relationship - by Herbert Patrick Fraser (1969) | History | Politics",
      "Kashmir fights for freedom Vol 2 - by Yusuf Saraf (1979) | History | Politics",
      "A Fate Written on Matchboxes - by Hafsa Kanjwal (2023) | History | Politics",
      "Colonizing Kashmir: State-building under Indian Occupation - by Hafsa Kanjwal (2023) | History | Politics",
      "JP on Jammu and Kashmir - by Balraj Puri (2005) | Secondary source | Politics",
      "Kashmir: The Vajpayee years - by A.S Dulat (2015) | Memoir | Politics",
      "Kashmir 1947-1965 - by Mahomedali Currim Chagla (1965) | History",
      "Family and Kinship: A Study on The Pandits of Rural Kashmir - by T.N Madan | History",
      "Kashmir from 1947 to 1977 - by Sanaullah Bhat (1980) | History",
      "What happened to governance in Kashmir? - by Aijaz Ashraf Wani (2018) | History | Politics",
      "My Kashmir: The Dying of the light - by Wajahat Habibullah (2011) | Memoir | Politics",
      "Rumours of Spring - by Farah Bashir (2021) | Politics",
      "My Life and Times - by Mir Qasim | Politics | Primary source",
      "Resisting Disappearance - by Ather Zia (2019) | Politics",
      "Behold I shine: Narratives of Kashmiri Women and Children - by Freny Manekshaw (2017) | Politics",
      "Kashmir: The case for freedom - by Arundhati Roy (2011) | Politics",
      "Crafting Peace in Kashmir - by Verghese Koithara (2004) | Politics",
      "The parchment of Kashmir: History, Society and Polity - by Nyla Ali Khan (2012) | History | Politics",
      "The Human Toll of Kashmir Conflict: Grief and Courage in South Asian Borderland - by Shubh Mathur (2016) | Politics",
      "Kashmir and the future of South Asia - by Ayesha Jalal (2020) | General | Politics",
      "Desiccated land: An American in Kashmir - by David Lepeska (2023) | Memoir",
      "Human rights violation in Kashmir - by Piotr Balcerowicz, Agnieszka Kuszewska (2022) | Politics",
      "Article 370: A Constitutional History of Jammu and Kashmir - by A.G Noorani (2011) | History | Politics",
      "A Dismantled State: The Untold Story of Kashmir After Article 370 - by Anuradha Bhasin (2022) | History | Politics",
      "Shaur-e-Farda (Letters of Maqbool Bhat) - by Mohammad Saeed Asad (1999) | Primary source | Politics",
      "Roshini ka Shaheed-e-Awal (The First Martyr of Light) - by Azam Inquilabi | Biography | Politics",
      "Jihad e Musalsal - by Amanullah Khan (1992) | Primary source | Politics",
      "Free Kashmir - by Amanullah Khan (1970) | Politics",
      "Kashmir in the Aftermath of Partition - by Shahla Hussain (2021) | Politics",
      "Kashmir Liberation Movement (published 1959)",
      "Red Menance in Kashmir - by Jagan Nath Sandhu (1955)",
      "Behind the Iron Curtain in Kashmir - by Jagan Nath Sandhu (1952)",
      "Yaad e Rafta - by K.D Sethi",
      "Valley of Kashmir: The making and unmaking of composite culture? - by Aparna Rao (2008) | General | History | Politics",
      "Numbers as political allies: The census in Jammu and Kashmir - by Vikas Kumar (2024) | Politics",
      "Kashmir: A Walk Through History - by Khalid Bashir (2018) | General | History",
      "The Meadow - by Adrian Levy and Cathy Scott (2012) | Politics",
      "Curfewed night - by Basharat Peer (2009) | Biography",
      "Munnu - by Malik Sajad (2015) | Biography",
      "Of Gardens and Graves - by Suvir Kaul (2017) | Politics",
      "A desolation called Peace - by Ather Zia (2019) | Politics",
      "Reclaiming the past?: the search for political and cultural unity in contemporary Jammu and Kashmir - by Vernon Hewitt (1995) | Politics",
      "Kashmir Conflict: A study of what led to the insurgency and proposed future solutions - by Priyanka Bakaya and Sumeet Bhatti | Politics",
      "Sheikh Muhammed Abdullah's Reflection on Kashmir - by Nyla Wani (2018) | History | Politics",
      "The life of a Kashmiri women - by Nyla Wani",
      "Forbidden Journey: From Peking to Kashmir (1937)",
      "Travels in Kashmir: A Popular History of Its People, Places, and Crafts - by Brigid Kenan (1989)",
      "Jumoo and Kashmir Territories - by Federick Drew"
    ]
  };

  return (
    <main className="min-h-screen bg-white text-black p-4 md:p-8 font-mono">
      <header className="border-b-4 border-black pb-6 mb-12">
        <Link href="/" className="text-sm font-bold hover:underline mb-4 block uppercase">
          ← BACK TO ARCHIVES
        </Link>
        <h1 className="text-4xl md:text-6xl font-black uppercase">
          SUPPLEMENTARY MATERIAL
        </h1>
      </header>

      <div className="flex flex-col max-w-5xl">
        
        {/* 1. FAQs by Chapter */}
        <div className="border-t-4 border-black">
          <button
            onClick={() => toggleSection('faq')}
            className="w-full flex justify-between items-center py-6 text-2xl md:text-4xl font-black hover:bg-black hover:text-white transition-colors text-left px-2"
          >
            <span>1. FREQUENTLY ASKED QUESTIONS</span>
            <span className="text-xl">{openSection === 'faq' ? '[—]' : '[+]'}</span>
          </button>
          
          {openSection === 'faq' && (
            <div className="bg-gray-50 border-t-2 border-black">
              {Object.entries(faqChapters).map(([chapter, questions]) => (
                <div key={chapter} className="border-b-2 border-black">
                  <div className="bg-black text-white px-6 py-3 font-bold text-sm uppercase">
                    {chapter}
                  </div>
                  {questions.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300">
                      <button
                        onClick={() => toggleSubSection(chapter + '-' + index)}
                        className="w-full text-left py-4 px-6 font-bold text-base hover:bg-black hover:text-white transition-colors flex justify-between items-start gap-4"
                      >
                        <span className="flex-1">{faq.question}</span>
                        <span className="text-sm flex-shrink-0">
                          {openSubSection === (chapter + '-' + index) ? '[-]' : '[+]'}
                        </span>
                      </button>
                      {openSubSection === (chapter + '-' + index) && (
                        <div className="px-6 pb-6 bg-white border-t border-black">
                          <div className="text-sm leading-relaxed whitespace-pre-line mb-4">
                            {faq.answer}
                          </div>
                          {faq.sources && faq.sources.length > 0 && (
                            <div className="border-t border-gray-300 pt-4 mt-4">
                              <p className="text-xs font-bold mb-2 uppercase">Further Reading:</p>
                              <ul className="space-y-1">
                                {faq.sources.map((source, idx) => (
                                  <li key={idx}>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs underline hover:bg-black hover:text-white px-1"
                                    >
                                      → {source.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* FAQ Credit */}
              <div className="bg-white border-t-2 border-black p-6 text-center">
                <p className="text-xs opacity-60 uppercase">
                  FAQ curated and maintained by{' '}
                  <a 
                    href="https://www.reddit.com/user/bluntforce_trauma" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-100"
                  >
                    u/bluntforce_trauma
                  </a>
                  {' '}and{' '}
                  <a 
                    href="https://www.reddit.com/user/KashurNafarStep" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-100"
                  >
                    u/KashurNafarStep
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 2. External Links */}
        <div className="border-t-4 border-black">
          <button
            onClick={() => toggleSection('links')}
            className="w-full flex justify-between items-center py-6 text-2xl md:text-4xl font-black hover:bg-black hover:text-white transition-colors text-left px-2"
          >
            <span>2. EXTERNAL LINKS</span>
            <span className="text-xl">{openSection === 'links' ? '[—]' : '[+]'}</span>
          </button>
          
          {openSection === 'links' && (
            <div className="bg-gray-50 border-t-2 border-black">
              {Object.entries(externalLinks).map(([category, links]) => (
                <div key={category} className="border-b border-black">
                  <button
                    onClick={() => toggleSubSection(category)}
                    className="w-full text-left py-4 px-6 font-bold text-lg hover:bg-black hover:text-white transition-colors flex justify-between items-center uppercase"
                  >
                    <span>{category}</span>
                    <span className="text-sm">{openSubSection === category ? '[-]' : '[+]'}</span>
                  </button>
                  {openSubSection === category && (
                    <ul className="bg-white border-t border-black">
                      {links.map((link, idx) => (
                        <li key={idx} className="border-b border-gray-300">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-3 px-8 text-sm hover:bg-black hover:text-white transition-colors"
                          >
                            → {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Recommended Books */}
        <div className="border-t-4 border-b-4 border-black">
          <button
            onClick={() => toggleSection('books')}
            className="w-full flex justify-between items-center py-6 text-2xl md:text-4xl font-black hover:bg-black hover:text-white transition-colors text-left px-2"
          >
            <span>3. RECOMMENDED BOOKS</span>
            <span className="text-xl">{openSection === 'books' ? '[—]' : '[+]'}</span>
          </button>
          
          {openSection === 'books' && (
            <div className="bg-gray-50 border-t-2 border-black">
              {Object.entries(recommendedBooks).map(([era, books]) => (
                <div key={era} className="border-b border-black">
                  <button
                    onClick={() => toggleSubSection(era)}
                    className="w-full text-left py-4 px-6 font-bold text-lg hover:bg-black hover:text-white transition-colors flex justify-between items-center uppercase"
                  >
                    <span>{era}</span>
                    <span className="text-sm">{openSubSection === era ? '[-]' : '[+]'}</span>
                  </button>
                  {openSubSection === era && (
                    <ul className="bg-white border-t border-black">
                      {books.map((book, idx) => (
                        <li key={idx} className="py-3 px-8 text-sm border-b border-gray-300 leading-relaxed">
                          • {book}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              
              {/* Book List Credit */}
              <div className="bg-white border-t-2 border-black p-6 text-center">
                <p className="text-xs opacity-60 uppercase">
                  Book list curated by{' '}
                  <a 
                    href="https://www.reddit.com/r/Kashmiri/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-100"
                  >
                    r/Kashmiri
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      <footer className="mt-12 text-xs opacity-50 border-t-2 border-black pt-6">
        <p className="uppercase">Search these titles in our main archive. For book requests or corrections, visit the About section.</p>
      </footer>
    </main>
  );
}