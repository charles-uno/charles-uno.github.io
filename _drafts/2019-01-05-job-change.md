---
layout: post
title: "How I Almost Left Cray"
image: "/assets/images/javier-allegue-barros-signpost-thumb.png"
description: ""
---

In grad school, I did an internship at [Cray](http://www.cray.com) writing automated tests. They liked that I had experience running physics models on supercomputers, and knew how to take ownership of a project. I liked that they were a non-evil[^1] tech company with lots of bizarre problems to solve. They made me an offer to join the test organization, which I accepted as soon as I finished my PhD.

[^1]: Cray sells mostly to national labs and universities: weather modeling, scientific research, etc. There are some intelligence agencies and petroleum companies in the mix as well. Nobody's perfect, but on balance, I believe Cray makes the world a better place.  

After a few rounds of writing tests, I drifted over to test *infrastructure*: mainframe administration, tool development, and miscellaneous automation. The job treated me well even as Cray hit [rough times](http://www.startribune.com/cray-to-idle-190-workers-about-14-percent-of-its-staff/435452993/). I had a fair amount of freedom to choose my projects. My manager gave me lots of opportunities to grow and explore[^2]. I got along well with my team. There were donuts every Tuesday. It was smooth sailing.

[^2]: It's only in hindsight I realize how phenomenal Gina was as a manager. I swear she had my whole career path mapped out in her head. Every time I came to her looking for more, she had something up her sleeve. Mentoring an intern. Rotation in another group. High-profile project. Engaging with a customer site.

Summer 2018, the seas got rough. A few of us were tasked with putting together a test pipeline under the direction of Dennis, the test organization's Staff Engineer. Dennis knew software, hardware, budgeting, and customer relations -- but he didn't take naturally to breaking down a goal and setting priorities. It was a frustrating situation for everyone, and it dragged on for six months.

Fall 2018, we started taking on water. Of the thirty engineers in the test organization, twenty were getting embedded in development teams. The other ten (myself included) faced uncertainty. There would be an integration team, an infrastructure team, and a team focused on full-system testing -- but it would be months before we knew where individual engineers, managers, and responsibilities would end up. Looking at the numbers, it was clear not everyone would get their first choice.

I knew where I *wanted* to end up: DevOps. I had just spent months finagling with Jenkins, Docker, and a mishmash of REST APIs. The work was interesting, I was good at it, and it's an [up-and-coming](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1) field. Plus the central DevOps organization, a brainchild of the new [SVP of R&D](https://www.hpcwire.com/2017/01/26/stathis-papaefstathiou-takes-rd-reins-cray/), was understaffed. I applied for a few jobs over there, shook a few hands, but there were no straight answers to be had as long as the re-organization was in motion.

My next step[^3] was to scope out jobs outside Cray. Over the next few weeks I chatted with at least a dozen recruiters on the phone, met a few of them in person, and got a bite on a DevOps position at Wells Fargo.

[^3]: Maybe I should have checked out the market earlier. I know some people keep their ear to the ground all the time! But for me, job hunting is emotionally exhausting.

Everything came together in mid-December:

- The re-org finally got nailed down. Two of us who had worked closely on the test pipeline were tapped to move (laterally) to the central DevOps organization.
- When applying for DevOps positions within Cray, I had also inadvertently applied for a DevOps job with the semi-independent Storage product line. After a few interviews, they offered me a lateral move.
- Wells Fargo made me an offer for 10% more than what I was making at Cray.

The central DevOps organization is where I had wanted to end up, but now I wasn't so sure. The potential upside was high: I would be doing important work, highly visible across the company. As one of the more senior members of the team, there would also be leadership opportunities. On the other hand, management was a big question mark. The DevOps director was a fresh hire, and, due to a last-minute competing offer, I would start out reporting to an empty chair.

The Storage position had a different sort of appeal. I did interviews with six members of the organization, including the VP, and came out of all six feeling great. And as *the* DevOps guy for the organization, I would have a lot of freedom to steer implementation. But, at least in the near term, the role would be be almost entirely technical -- limited opportunity for networking or leadership.

As for Wells Fargo... that job was more-or-less an insurance policy taken out against a bad re-organization. The group seemed nice, the office was gorgeous, and the money was better. But the company felt anonymously large, and it's hard to compete with the toys at Cray.










Town hall with Jose, the VP in charge of Test and DevOps. Uninspiring.


Wells Fargo: more like an insurance policy, really. the group seemed nice, the office was *gorgeous*, and I probably could have made more money there[^4]. but the company felt anonymously large, and the toys at Cray are hard to beat.


[^4]: CTH, understanding of my expectations, bookkeeping...


bringing in an external offer is something you only get to do once.




---


My job treated me well, even as Cray hit [rough times](http://www.startribune.com/cray-to-idle-190-workers-about-14-percent-of-its-staff/435452993/). I started out writing tests, then moved into test infrastructure. Mainframe administration, boot analysis, log scraping -- every few months, there would be a new batch of problems to tackle.

Shit hit the fan in mid-2018. Cray's new [SVP of R&D](https://www.hpcwire.com/2017/01/26/stathis-papaefstathiou-takes-rd-reins-cray/) had promised to drag the company kicking and screaming into this century, and the test organization in particular found itself in his crosshairs. He wanted industry-standard tools, but we used a patchwork of homegrown scripts. He wanted testers embedded with development groups, but we were centralized. He wanted agile, but we used waterfall. Suddenly, we found ourselves responsible for getting an automated test pipeline up and running in an implausibly-short amount of time.

This was all overseen by Dennis, the test director's right hand man. My aim isn't to air out dirty laundry, so I'll just say: Dennis is a Staff Engineer by virtue of his technical work, hardware knowledge, business savvy, and customer relationships. He doesn't have a background in breaking down goals, setting priorities, or delegating work. It was rough.

The second shoe fell at the end of Q3. Of the thirty test engineers reporting to Linda, twenty would be reorganized into development teams in early 2019. The other ten, myself included, faced an uncertain future. Some would remain testers, focused specifically on full-system testing. There would also be an infrastructure group and an integration group, though it was still unclear which people (and which responsibilities) would land where.

I knew where I wanted to land. For the past three months, I had been writing pipeline code all day, every day. The work was interesting, I was good at it, and it was crucially important. Pipeline automation was central to Cray's long-term plan, but the [DevOps](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1) group was understaffed and missing deadlines. The group had a few jobs posted, so I applied for them. Hiring decisions were on hold -- DevOps was also in the midst of a re-org -- but at least I got some face-to-face meetings to express my interest.


Not long ago, Cray hired a [new SVP of R&D](https://www.hpcwire.com/2017/01/26/stathis-papaefstathiou-takes-rd-reins-cray/), who promised to drag the company kicking and screaming into this century. He wanted to see the adoption of industry-standard tools, [agile software development practices](https://en.wikipedia.org/wiki/Agile_software_development), pipeline automation, and embedded testing. Six months later, as if to drive home the urgency of these reforms, Cray [laid off](http://www.startribune.com/cray-to-idle-190-workers-about-14-percent-of-its-staff/435452993/) one out of every seven employees.

FOOT: "Pipeline" basically refers to using a tool like [Jenkins](https://en.wikipedia.org/wiki/Jenkins_(software)) to automatically perform a series of tasks. For example, we might use a pipeline to test our source code whenever someone makes a change. If the tests pass, the pipeline automatically installs the code so nobody keeps accidentally using the old version. If the tests fail, the pipeline reverts the change and sends an email to whoever made it. Pipelines can be tricky to set up, but once they're running they allow everyone to work much more efficiently.

Linda, the director of testing and my boss-boss, found herself in the crosshairs. Testing at Cray was a central organization, with testers rarely embedded in development teams. Runs were orchestrated by a multi-decade patchwork of home-grown scripts -- barely an industry-standard tool in sight, and certainly not something you'd want to plug into a build pipeline. And, of course, this shake-up was hitting us just as work on [Shasta](https://www.hpcwire.com/2018/10/30/cray-unveils-shasta-lands-nersc-9-contract/) (Cray's once-per-decade paradigm shift) was kicking into high gear.

From where I sat, it felt like the changes might be gradual. We tidied up our infrastructure, which seemed to go over well. Testers were half-embedded in a few projects, getting involved early in the development process while remaining organizationally distinct. Linda did her best to show the value of the test organization.

Shit hit the fan in July. Our infrastructure cleanup had been cute, but R&D was going all-in on third-party automation tools like Jenkins. Three of us (plus my intern) were dedicated to getting a test pipeline up and running as quickly as possible. Dennis, Linda's right hand man, took charge of the project.

The next few months were rough. My aim isn't to air out dirty laundry, so I'll just say: Dennis is a Staff Engineer by virtue of his technical work, hardware knowledge, business savvy, and customer relationships. But his skill set does not cover breaking down a goal, setting priorities, or delegating work.

The second shoe fell at the end of Q3. Of the thirty test engineers reporting to Linda, twenty would be reorganized into development teams in early 2019. The other ten, myself included, faced an uncertain future. Some would remain testers, focused specifically on full-system testing. There would also be an infrastructure group and an integration group, though it was still unclear which people (and which responsibilities) would land where.

I knew where I wanted to land. For the past three months, I had been writing pipeline code all day, every day. The work was interesting, I was good at it, and it was crucially important. Pipeline automation was central to Cray's long-term plan, but the [DevOps](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1) group was understaffed and missing deadlines. The group had a few jobs posted, so I applied for them. Hiring decisions were on hold -- DevOps was also in the midst of a re-org -- but at least I got some face-to-face meetings to express my interest.

Around this time, I also checked that box on LinkedIn that lets recruiters contact you -- and contact me they did. I chatted with at least twenty recruiters on the phone, and met with a handful in person. There were a lot of dead ends, opportunity-wise, but talking through job after job helped me nail down

---

In the meantime, we continued to work under Dennis' direction. It wasn't clear where people (or responsibilities) were going to land, so he did his best to align the team to the Q4 objectives laid out by upper management. The team consolidated documentation, created testing resources, and put on tech forums. We checked a lot of boxes, but it was often unclear if we were creating anything of real value -- a concern I raised more than once.

I had just spent three months writing pipeline code all day, every day. I enjoyed the work, I was good at it, and it was crucially important. Pipeline automation was central to Cray's long term plan, but [DevOps](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1) was short-staffed and missing deadlines. Getting pulled off the pipeline to write up a blog post comparing and contrasting [avocado](https://avocado-framework.github.io/), [pytest](https://docs.pytest.org/en/latest/), and [unittest](https://docs.python.org/3/library/unittest.html)FOOT was like a slap in the face.

FOOT: Of the unit testing options for Python, pytest is the nicest to work with. But honestly they're all fine.

I raised my objections politely, firmly, forcefully, and maybe even mutinously.

I made a lot of noise about pipeline work. seemed to me that it was pretty important, aligned with a big-picture vision. but we were pushed to instead take on low-risk tasks. assembling documentation. guidance on unit testing. investigating third-party tools. maybe trying to avoid stepping on toes, give the SVP exactly what he asked for, but in practice it's not clear who (if anyone) we were creating value for.

also networked with Gina, Dan, David to try to get us moved over.
In practice, I had been doing infrastructure work for a while. applied for a few DevOps positions within Cray. Had worked closely with the DevOps team while getting our pipeline set up.

everything came together in mid-december, right before Cray's week-long holiday shutdown.

org chart showing they want to move me over to DevOps

Town hall with Jose

Gina took a different position within Cray

Jose is Linda's boss -- and also Tara's boss. Tara is new. DevOps position is under a new director, and there is no manager.


On my plate all at once: Wells Fargo offer, DevOps, Storage






Gina. Existing manager. Is *great*.

I'm driven to climb, but don't have a long-term plan. Every time I was looking for more, Gina had something in her pocket. Would I like to mentor an intern? How about interface with a customer site? Jump onto a team of junior engineers and offer guidance? Direct the team from the Governance Board?

options: architect? management?

Offer from Storage. Would be very visible to the VP, Charlie.



Checked that box on LinkedIn that tells recruiters to contact me, and did they ever.

Spoke to probably a dozen different recruiters on the phone, and met with a handful in person. Got the most traction with a recruiter representing Wells Fargo.
