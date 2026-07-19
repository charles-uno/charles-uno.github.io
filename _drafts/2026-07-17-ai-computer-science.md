---
layout: post
title: "Computer Science, Software Engineering, and Generative AI"
image: "/files/cs-swe-ai/motherboard-alexandre-debieve-thumb.png"
description: "'Computer' used to be a job title. Now it's the name of a machine. Is 'programmer' next?"
tags: stem
---

Computers are impossibly good at math. They crunch numbers a million times faster, cheaper, and more accurately than any human. This creates a sizable incentive to turn all sorts of problems into math problems. As soon as you've turned something into a math problem, you can outsource it to a computer, which will solve it quickly and reliably.

That's what software engineers do. They take a problem, break it into computer-friendly pieces, and plug it into a computer using programming code. Software engineering is a well-paid profession that has seen consistent growth over the past few decades. Many college students study computer science with the intention of becoming software engineers. 

Recent advances in AI tooling have thrown the software engineering industry for a loop. Coding via AI agent has gone from novelty to industry-standard within less than a year. Experienced engineers can use AI tools to [work faster][ai_faster_work]. Non-engineers can use these tools to "[vibecode][vibecode]" software with minimal knowledge of the underlying machine. CEOs are eager to save money by [cutting engineers][block_layoffs] and using AI to fill the gaps. Computer science students and educators are scrambling to figure out what the future looks like. 

> TODO: add a sentence in here to tease that we have lost busywork as a teaching tool?

[vibecode]: https://en.wikipedia.org/wiki/Vibe_coding
[block_layoffs]: https://www.cnn.com/2026/02/26/business/block-layoffs-ai-jack-dorsey
[ai_faster_work]: https://metr.org/blog/2026-02-24-uplift-update/#other-means-of-measuring-productivity

I don't know the future, of course, but I've got a pretty good view of the present. I've been a software engineer for ten years; I currently work at Meta, which is [all-in on AI][zuck_ai]. I also moonlight as a computer science professor. I have grudgingly become a regular AI user for both coding and curriculum development. Here's how things look from where I'm standing. 

[zuck_ai]: https://www.reuters.com/business/meta-plans-600-billion-us-spend-ai-data-centers-expand-2025-11-07/

## Demand for Coding Skills Was Dropping Before AI

Over the course of the 2010s, [software ate the world][software_ate_the_world]. Tech companies hired aggressively as they expanded into brick-and-mortar markets. For example:

- Netflix [bankrupted Blockbuster][netflix_blockbuster] in 2010
- By 2014, more people [got their news][fb_overtakes_newspapers] from Facebook than from newspapers
- Rideshare apps [surpassed traditional taxis][uber_taxis] around 2015
- Music streaming apps [overtook music purchases][spotify_cds] around 2016

[software_ate_the_world]: https://a16z.com/why-software-is-eating-the-world/
[netflix_blockbuster]: https://variety.com/2013/biz/news/epic-fail-how-blockbuster-could-have-owned-netflix-1200823443/
[fb_overtakes_newspapers]: https://harvardpolitics.com/breaking-news/
[uber_taxis]: https://www.businessinsider.com/bofa-chart-uber-lyft-killing-traditional-taxis-2016-10
[spotify_cds]: https://www.theguardian.com/music/2016/apr/12/streaming-revenues-bring-big-boost-to-global-music-industry

Then came the COVID pandemic. People were home all day glued to their smartphones. This was more money in tech company pockets, which further fueled the demand for software engineers:

- [Ad spending on social media][covid_online_ads] saw double-digit growth at the expense of print media
- App-based food delivery [tripled][covid_food_delivery]
- Video call apps saw usage increase [*thirty*-fold][covid_video_calls]. 

[covid_online_ads]: https://www.weforum.org/stories/2020/06/coronavirus-advertising-marketing-covid19-pandemic-business/
[covid_food_delivery]: https://www.ers.usda.gov/publications/106521
[covid_video_calls]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8165498/

There were only so many software engineers to go around. Companies competed for them. Salaries and [perks][perks] skyrocketed. Hiring standards dropped. I was lucky enough to experience this firsthand. A recruiter from Meta called me in late 2020. My resume was decent. My interview went badly. They ghosted me. But then, a few weeks later, their hiring quota went up. They called me back with an offer that doubled my previous salary.

[perks]: https://www.businessinsider.com/tech-workers-office-perks-ski-trips-massages-meals-list-2023-2

College students took notice. They learned to code. From 2010 to 2024, the number of students graduating with a computer science major [increased five-fold][fivefold_increase]. The total number of software engineers in the USA, in turn, went from [one million in 2010][2010_swe_count] to [nearly two million in 2024][2024_swe_count]. 

Computer science and software engineering aren't even the same thing! Computer science is about the fundamental logic, math, and physics of computation. Software engineering is about using the computer as a tool to create a product. Your average software engineer doesn't care how compilers work or how memory gets allocated. Your average computer science major has never heard of tech debt. But the market was ferociously hungry for coding skills, and computer science programs teach those skills, so we ended up with a pipeline from computer science to software engineering. 

[fivefold_increase]: https://www.yahoo.com/news/articles/hottest-college-major-hit-wall-140231155.html
[2010_swe_count]: https://www.bls.gov/opub/btn/volume-2/careers-in-growing-field-of-information-technology-services.htm
[2024_swe_count]: https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm

As the pandemic wound down, so did the hiring frenzy. Software was already integrated into every part of daily life, so there was less room left to expand. Job postings have been [trending down][swe_jobs_dropping_post_covid] for the past few years, with entry-level positions [hit hardest][swe_drop_by_seniority]. Layoffs are [rising][2026_tech_layoffs]. Salaries for new computer science grads are [dropping][swe_salary_dropping] closer to the other sciences. The pendulum was swinging away from computer science majors even before AI got good. 

[swe_jobs_dropping_post_covid]: https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE
[swe_drop_by_seniority]: https://www.finalroundai.com/blog/entry-level-jobs-disappearing-fast-because-of-ai
[2026_tech_layoffs]: https://www.bloomberg.com/news/articles/2026-06-04/us-tech-sector-announces-most-job-cuts-in-nearly-two-years
[swe_salary_dropping]: https://www.reveliolabs.com/news/social/computer-science-has-hit-its-high-water-mark/

## AI Has Redefined Software Engineering

Senior software engineers don't actually write that much code. We spend a lot of time on product roadmaps, system design, and cross-team bookkeeping. Once in a while we get to prototype a new feature or debug a tricky issue. But once the path forward is clear, the bulk of the implementation is passed to junior engineers. 

That's how things used to be at least. These days, we delegate the mechanical work to AI agents instead. AI is good at learning a new codebase. It's good at breaking up medium-sized goals into actionable steps. It's good at turning those steps into code. It's even good at writing up a summary of what it's done. And it can do all of those things much *much* faster than a human. Hobby projects may still be coded by hand, but at this point AI is the industry standard[^slopware] for line-by-line coding. 

[^slopware]: You can find a list of AI-contaminated software [here](https://codeberg.org/ethical-foss/open-slopware). It includes pretty much everything you've ever heard of. 

<!--
It's not just coding either. AI is increasingly good at the fiddly manual tasks that pop up during the day. For example:

- Turning some bullet points into a presentable document
- Parsing project timelines from half a dozen different docs into a flowchart
- Finding a "good enough" answer to a vague question
- Cleaning up an outdated wiki page
- Taking a bunch of old data and converting it to a more convenient format

Sometimes AI can shoehorn these tasks into an existing piece of software. Sometimes it writes new code on the fly. Either way, AI has significantly decreased the cost of outsourcing work to the machine. 
-->

Fresh computer science grads are in a rough spot. Many of them studied computer science for the coding skills, but now AI has undercut the demand for those skills. Entry-level software engineering jobs are [few and far between][entry_level_collapse], though some parts of the industry are holding up better than others:

- Infrastructure-focused[^infra] roles are [still in demand][infra_demand]. These engineers engage with the ugly, tedious, and confusing parts of the machine because their whole job is to hide those details from everyone else. These jobs want computer science majors for their computer science knowledge overall, not just the coding skills. According to a [recent industry survey][swe_breakdown], this accounts for about a third of software engineers. 
- The other two-thirds of software engineers are focused on product behavior. These roles are getting hit hard. AI is very good at creating websites and apps. A vibecoder with expertise in the product may do this work better than a computer science grad, since the job just doesn't require knowledge of what's happening under the hood. 

AI is very good at writing code. It's hard to see the industry going back to writing code by hand. <!--AI can do the other fiddly stuff too.--> You no longer need a computer science degree to convert product requirements into an app or website. but we still need infrastructure (both human and technical) to hold it all together. 

<!--
software engineer -> ai as a software *engine*
-->

[^infra]: cloud infrastructure, [devops][devops], security, observability, compilers, kernels, devices, machine learning. also probably a bunch of [distributed][distributed_system] [middleware][middleware]

[devops]: https://en.wikipedia.org/wiki/DevOps
[distributed_system]: https://en.wikipedia.org/wiki/Distributed_computing
[infra_demand]: https://underdog.io/blog/tech-hiring-trends
[middleware]: https://en.wikipedia.org/wiki/Middleware
[swe_breakdown]: https://survey.stackoverflow.co/2025

<!--
Entry-level software engineering jobs are vanishing because, frankly, that niche belongs to AI now. we do not need humans to type our boilerplate anymore

niche is smaller and shaped differently?

- a third are low-level. still need CS expertise
- two thirds are focused on the product. minimal dependence on CS fundamentals

junior-to-senior pipeline for low-level work

[Nobody is hiring][entry_level_collapse] junior software engineers because, frankly, they're not very useful right now. AI tools have taken their niche, and we haven't figured out a new niche for them yet. Fresh computer science grads are in a rough spot. I wish I could offer answers here. Instead I just have a big question: when today's senior engineers want to retire, who will replace them?
-->

[entry_level_collapse]: https://hakia.com/news/junior-developer-crisis-2026/

## Other Industries will be Disrupted Too

<!--
## AI is bigger than coding
-->

Software engineering adopted AI because of its coding skills. As we've gotten familiar with it, we've found that it can also handle all sorts of fiddly manual tasks that pop up during the day. For example:

- Turning some bullet points into a presentable document
- Parsing project timelines from half a dozen different docs into a flowchart
- Finding a "good enough" answer to a vague question
- Cleaning up an outdated wiki page
- Taking a bunch of old data and converting it to a more convenient format

Sometimes AI can shoehorn these tasks into an existing piece of software. Sometimes it writes new code on the fly. Either way, AI has significantly decreased the cost of outsourcing work to the machine. 

<!--
AI has taken on much of the mechanical work from software engineering. It can convert a flowchart to a design document, break a design document into tickets, implement a ticket as code, then schedule a meeting to keep stakeholders in the loop. The work isn't beautiful, and I often have to step in with corrections, but it's appreciably faster than doing it myself or delegating it to another person. 
-->

Fiddly computer tasks exist in other industries too. Teachers and bankers and salespeople spend plenty of time reading emails and writing spreadsheets. It will soon become clear that AI is undeniably better than humans at all sorts of white-collar bookkeeping. The forward march of AI isn't unique to software engineering; it just hit us first. This makes sense for a few reasons:

- Big tech is investing a lot of money into AI. We have whole teams of engineers figuring out how to cram every bit of relevant context into an AI chatbot. This means our in-house tooling is a step or two ahead of what you'd see from that same model fresh out of the box. 
- Pretty much every tool used by software engineers has a text interface via the Linux terminal. We use this interface to write little programs to automate tedious parts of our jobs. This same interface is very convenient for AI integrations. Buttons and dropdowns and other "pretty" interfaces are trickier to use programmatically.
- AI can respond very differently depending on how a prompt is phrased. We've had a lot of practice at it because our bosses [pushed us to adopt AI tooling][big_tech_early_ai] early. 
- Software engineers are expensive! Six-figure salaries are the norm. For that price, companies do not want us spending our time copy-pasting data from Excel into PowerPoint.

[big_tech_early_ai]: https://www.economist.com/business/2023/03/26/big-tech-and-the-pursuit-of-ai-dominance

Other industries will catch up. AI-friendly integration points will be added to proprietary software. AI tooling will be tweaked to abide by industry-specific [regulations][healthcare_regulations]. Computers are getting [cheaper and faster all the time][moores_law] (though AI costs specifically may [go up in the near term][reduced_subsidies]). AI models today are fundamentally "smart" enough to absorb the mechanical work from all sorts of different white-collar professions. For better or for worse, it's just a matter of time before they get plugged in. 

[healthcare_regulations]: https://www.sciencedirect.com/science/article/pii/S3050708126000273
[moores_law]: https://en.wikipedia.org/wiki/Moore%27s_law
[reduced_subsidies]: https://dev.to/shrsv/the-subsidy-era-is-over-a-reality-check-on-ai-powered-dev-tool-pricing-51dn


<!--
## Fewer Jobs Need Computer Science Expertise

In the early days of computing, people wrote programs in Assembly. The language is tedious, error-prone, and requires intimate knowledge of the hardware you're using. Then came C, which adds a layer of abstraction on top of the machine details, making it easier to focus on the logic of the program. The compiler turns C code into Assembly under the hood. Later, Python was built on top of C. Python syntax is much easier to read, and the language has built-in libraries for everything from [retro games][python_retro_games] to [robotics][circuitpython]. 

[python_retro_games]: https://github.com/kitao/pyxel
[circuitpython]: https://circuitpython.org/

Every step along the way, it has become cheaper and easier to outsource work to the machine. As a result we've seen ever-more-abundant software, created by people with ever-more-diverse backgrounds, addressing ever-more-specific problems. Fifty years ago, [Shazam][shazam] would have been unfathomable to [Grace Hopper][grace_hopper]. These days, a hobbyist could write it in an afternoon. 

[shazam]: https://en.wikipedia.org/wiki/Shazam_(music_app)
[grace_hopper]: https://en.wikipedia.org/wiki/Grace_Hopper

I think AI will continue to broaden software engineering. I also think we'll see some turbulence along the way. Most software engineering roles today are held by people with a background in computer science. This won't necessarily be the case going forward. 

Roles focused on low-level systems will be disrupted the least. This includes anyone working on compilers, operating systems, devices, databases, site reliability, machine learning, and so on. A lot of [middleware][middleware] probably falls into this category too. Computer science fundamentals are deeply relevant to this part of the industry. They need to understand the ugly, tedious, and confusing parts of the machine because their whole job is to engage with those parts and hide them from everyone else. Based on a [recent industry survey][swe_breakdown], this accounts for about a third of software engineers. 


The other two-thirds of the industry is focused more on product behavior. This is pretty much anyone working on anything the user sees. I think these roles are at risk of being shaken up. Product engineers, by design, are insulated from the nitty-gritty details of the machine. As AI gets better and better at producing code, it becomes less and less important for product engineers to have a computer science degree at all. Instead of software engineers writing code for nurses and lawyers and architects, we may soon see those professions leveraging their own expertise to write it for themselves using AI as a software *engine*. 

This puts computer science educators in a tricky position. On one hand, we can stick to the fundamentals and accept the likely enrollment drop. Computers are fundamental to modern society. Someone should probably know how they work! On the other hand, we can try to make the major more relevant by focusing on using AI to build things. Less emphasis on the machine itself. More emphasis on project management, responsible data handling, and agent orchestration. Time will tell which approach works out better. 
-->

<!--
## Education Follows the Job Market

[Fewer than 10%][1960_college] of Americans had a college degree in 1960. College was a place for wealthy men to network, party, and [launder priviledge into credentials][launder_priviledge]. [Grades][grades_didnt_matter] didn't particularly matter. There was little emphasis on [specific majors][no_pipelines] leading to specific careers. 

These days, [almost half of Americans][college_stats] go to college. It's a big investment. It's career prep. Colleges brag about their job placement rates to attract students. Software engineering job postings require applicants to have specific majors. 

If AI becomes a major part of the economy, there will be immense pressure for colleges to fall in line. 

[college_stats]: https://www.bestcolleges.com/research/college-enrollment-statistics/

[no_pipelines]: https://www.norc.org/content/dam/norc-org/pdfs/NORCRpt_82.pdf

[grades_didnt_matter]: https://www.academia.edu/17179255/_The_1960s_and_the_Transformation_of_Campus_Cultures_History_of_Education_Quarterly_Spring_1986

[1960_college]: https://www.statista.com/statistics/184260/educational-attainment-in-the-us/?srsltid=AfmBOoqWN1ZxoKOL3XMbXlT8FyTx5J6LhpmQyK9WxoJ6iYzfB6YXiJ9j

-->

## We've Lost Busywork as a Teaching Tool

<!--
## Abstinence-Only Education Doesn't Work
## Sometimes the Busywork Was the Point
-->

Generative AI is very good at outsourcing fiddly white-collar tasks to the machine: reading, writing, translation, summary, and even some analysis. The transition has made a big mess, but ultimately the change is good for efficiency. We can produce the same result with less human effort. 

But sometimes the result isn't the point. As a professor, I don't care about the essays my students write or the diagrams they draw. I just want them to sit down and engage with the material. In the past, mechanical homework assignments were a way to force them to do so. It doesn't really work that way anymore. AI allows students to turn in flawless homework regardless of whether they've actually absorbed anything. 

A [big study about this][china_ai_study] came out recently. The authors show that the average student is completing homework faster and better, but their test scores are dropping. In other words, they're outsourcing the homework to AI and learning less themselves. The authors also note that some students defied the average. About 20% of AI-using students spent just as much time on the material as their non-AI-using peers. Those students saw their test scores *increase*. The idea is that they are using AI as a tutor, rather than as a machine that spits out the answers.

[china_ai_study]: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6868618

This aligns closely with my experience using AI for curriculum development. It's an incredible resource for exploring new material. It can find answers even when I'm not sure exactly what I'm looking for. Chatting with an agent is both faster and more engaging than reading Wikipedia pages from top to bottom. For example:

- "I'm developing a lecture about the TCP/IP model of networking for an undergraduate computer science course. I'd like to talk about security. Can you list some important network vulnerabilities for each layer?"
- "My chapter on CPU architecture is feeling a bit light. We already cover the ALU, instruction pipelining, and hazards. Could you suggest some other topics I could add to flesh it out?"
- "We're covering stack frames in Aarch64. I'm worried that pre-indexing syntax will unnecessarily confuse my students. Can you mock up an example where we stick to basic commands and update the stack pointer manually?"

Some students intuitively know how to use AI in a positive way. Maybe more will figure it out naturally as they gain experience. I think it also makes sense for us, as educators, to confront the issue head-on. We can use both carrots and sticks to nudge our students away from self-destructive AI use. Here's what I've got so far: 

- Honesty. AI is excellent at correctly answering questions about computer science. I'm not going to exaggerate the risk of hallucination to scare them away. I *am* going to explicitly call out the risk of short-circuiting their own learning. 
- Modeling. I demonstrate "good" AI use to my students by using it interactively to dig into points of confusion. I also give them time to do the same during lab exercises (while I am present to answer questions). 
- In-person assessment[^remote]. My grading leans heavily on closed-book exams and live presentations. The first assessment is just a few weeks into the term. Students may not realize how much they've glossed over until they sit down to take an exam without AI. I want to maximize their chance to course-correct.
<!-- - Temptation mitigation. If homework is worth half your grade, there's a big incentive to use AI to ensure you get it "right". If it's just practice for what you might see on the test, the only incentive is to learn it. -->
<!-- - Freedom to flex. I'm adding an open-ended final project to my course. I ask students to engage creatively with the material beyond what we cover in class. AI use is explicitly allowed, along with a challenge to build something appropriately ambitious. -->
- Curriculum updates. Mechanical skills are probably still valuable as scaffolding, but it seems hard to justify a course that's entirely focused on them. It probably makes sense to move curriculum around to ensure that the mechanical work in every course always feeds into a human skill like curiosity, communication, judgment, or system thinking. I'm specifically planning to spend much less time on programming syntax. I'll be using that time to instead focus on privacy/security and the open-ended final project. 

[^remote]: Remote learning seems extremely fucked

Our students have access to AI whether we want them to or not. We need to update how we teach and how we test. Otherwise many students will sabotage their own learning without even realizing it.

<!--
## AI Needs Guardrails

- water
- electricity
- data centers
- finding vulnerabilities and backdoors
- slop
- political disinformation
- sexually explicit deepfakes
- artist jobs
- once the knowledge is out there, it can't really be unmade
- training data IP theft. tax would be appropriate
-->

## Wrapup

Generative AI has significantly decreased the cost of outsourcing work to the computer. It can write programming code better, faster, and cheaper than a college graduate. It's also good with spreadsheets, flowcharts, calendars, and emails. 

Junior software engineers can't find jobs because AI took their niche. Senior software engineers now spend more time talking to AI than they do to other people. Years of computer science curriculum and teaching strategies are suddenly moot. And that's just one industry. These same tools are plenty "smart" to disrupt other white-collar professions as well. 

Amid the upheaval, I think there's room for optimism. Humans are the source of creativity, curiosity, and judgment. That's ultimately the important thing. AI just does the mechanical follow-through.

<!--
[fire]: https://en.wikipedia.org/wiki/FIRE_movement
[system_design]: https://en.wikipedia.org/wiki/Systems_design
[iac]: https://en.wikipedia.org/wiki/Infrastructure_as_code
[problem_decomposition]: https://en.wikipedia.org/wiki/Decomposition_(computer_science)
[furlexa]: https://www.raspberrypi.com/news/raspberry-pi-furby-furlexa-voice-assistant/
[craigslist]: https://www.craigslist.org/area/minneapolis
[project_based_learning]: https://en.wikipedia.org/wiki/Project-based_learning
[alex]: https://alexgude.com
[bootcamp]: https://careerkarma.com/blog/bootcamp-market-report-2020/
[history_of_devops]: https://www.bunnyshell.com/blog/history-of-devops/
[2020_swe_count]: https://www.bls.gov/oes/2020/may/oes151256.htm
[another_swe_breakdown]: http://evansdata.com/reports/viewRelease.php?reportID=9
[meta_big_ai_investment]: https://www.reuters.com/business/meta-sell-excess-ai-computing-capacity-via-cloud-business-bloomberg-news-reports-2026-07-01/
[devops]: https://en.wikipedia.org/wiki/DevOps
[sre]: https://en.wikipedia.org/wiki/Site_reliability_engineering
[cs_majors_increasing]: https://www.studentclearinghouse.org/nscblog/computer-science-has-highest-increase-in-bachelors-earners/
[tw]: https://speakers.acm.org/speakers/winters_20748
[launder_priviledge]: https://www.insidehighered.com/opinion/views/2023/07/10/education-privilege-laundering-opinion
[senior_skills]: https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html
[telemetry]: https://en.wikipedia.org/wiki/Website_monitoring
[tech_debt]: https://en.wikipedia.org/wiki/Technical_debt
[bls_2024]: https://www.newyorkfed.org/research/college-labor-market#--:explore:outcomes-by-major
[xkcd_manual_steps]: https://xkcd.com/2565/
[s_type_e_type]: https://microservices.io/post/architecture/2023/08/06/lehmans-laws-of-software-evolution.html
[end_of_programming]: https://cacm.acm.org/opinion/the-end-of-programming/
[git_and_grep_survive]: https://steve-yegge.medium.com/software-survival-3-0-97a2a6255f7b
[meta_leaks]: https://newsletter.pragmaticengineer.com/p/why-is-meta-destroying-its-engineering
[creative_jobs]: https://www.brookings.edu/articles/is-generative-ai-a-job-killer-evidence-from-the-freelance-market/
-->
