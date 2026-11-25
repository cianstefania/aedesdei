// English version of the course. Same structure and order as content.js (question ids must match).
window.COURSE_EN = [
{ id:"m1", t:"The circulatory system", s:"Heart, blood vessels and blood", lessons:[
  { t:"The system", cards:[
    { h:"What is the circulatory system?", b:"<p>The circulatory system moves blood through the whole body. The <b>heart</b> pumps blood through the <b>blood vessels</b> to the organs and tissues.</p><p>It consists of the heart, the blood vessels and the blood.</p>", img:"circulatie.jpg" },
    { h:"What blood does", b:"<ul><li>Carries oxygen and nutrients</li><li>Removes carbon dioxide and waste products</li><li>Protects against pathogens</li><li>Regulates body temperature</li><li>Prevents blood loss through clotting</li></ul>" },
    { h:"How much blood?", b:"<div class='stats'><div><b>7–8%</b><span>of body weight</span></div><div><b>4–5 L</b><span>women, on average</span></div><div><b>5–6 L</b><span>men, on average</span></div></div><p>The amount depends on body weight, height and build, among other things.</p>" }
  ]},
  { t:"Blood vessels and composition", cards:[
    { h:"Three types of blood vessels", b:"<dl><dt>Arteries</dt><dd>Carry blood away from the heart.</dd><dt>Veins</dt><dd>Carry blood back to the heart.</dd><dt>Capillaries</dt><dd>Exchange oxygen, nutrients and waste with the tissues.</dd></dl>" },
    { h:"Two circulations", b:"<p><b>Pulmonary circulation:</b> right side of the heart → lungs (take up oxygen) → left side of the heart.</p><p><b>Systemic circulation:</b> left side of the heart → body → back, low in oxygen, to the right side.</p>" },
    { h:"What is blood made of?", b:"<div class='stats'><div><b>± 55%</b><span>plasma</span></div><div><b>± 45%</b><span>blood cells and platelets</span></div></div><dl><dt>Red blood cells</dt><dd>Carry oxygen using haemoglobin.</dd><dt>White blood cells</dt><dd>Protect against infection.</dd><dt>Platelets</dt><dd>Help the blood clot.</dd></dl>", img:"samenstelling.jpg" },
    { h:"Good to know", b:"<p><b>Serum</b> is the fluid left after blood has clotted and been centrifuged. <b>Plasma</b> comes from blood whose clotting has been prevented.</p><p>We usually draw from a <b>vein</b>: veins lie fairly close to the surface and have lower pressure than arteries.</p>" }
  ]}],
  quiz:[
    { q:"Which blood vessel carries blood back to the heart?", a:["Artery","Vein","Capillary"], c:1, e:"Veins carry blood back to the heart." },
    { q:"Roughly what percentage of blood is plasma?", a:["35%","45%","55%","75%"], c:2, e:"Blood is about 55% plasma and 45% cells and platelets." },
    { q:"Which cells carry oxygen?", a:["Red blood cells","White blood cells","Platelets"], c:0, e:"Red blood cells carry oxygen using haemoglobin." },
    { q:"The pulmonary circulation runs through…", a:["the whole body","the lungs","the kidneys"], c:1, e:"It runs from the right side of the heart to the lungs and back to the left." },
    { q:"What is serum?", a:["Blood whose clotting has been prevented","Fluid left after clotting and centrifuging","A type of white blood cell"], c:1, e:"Serum is what remains after blood has clotted and been centrifuged." },
    { q:"Why do we usually draw blood from a vein?", a:["Veins contain more blood","Veins lie near the surface and have lower pressure","Veins carry oxygen-rich blood"], c:1, e:"Veins are fairly superficial and the pressure is lower than in arteries." }
  ]},
{ id:"m2", t:"Reasons for blood tests", s:"Why blood is tested", lessons:[
  { t:"Diagnosis and monitoring", cards:[
    { h:"Why test blood?", b:"<p>Blood tests help doctors <b>detect, diagnose, rule out or monitor</b> conditions, follow the effect of treatment, spot risks early and investigate hereditary conditions.</p>" },
    { h:"Confirming or ruling out", b:"<dl><dt>Anaemia</dt><dd>Hb, MCV, ferritin, vitamin B12</dd><dt>Diabetes mellitus</dt><dd>Glucose, HbA1c</dd><dt>Thyroid</dt><dd>TSH, free T4</dd><dt>Infection</dt><dd>CRP, white cell count</dd><dt>Kidneys</dt><dd>Creatinine, eGFR</dd><dt>Liver</dt><dd>ALT, AST, ALP, GGT, bilirubin</dd><dt>Heart damage</dt><dd>Troponin</dd></dl>" },
    { h:"Monitoring and treatment", b:"<p>In chronic disease blood is taken regularly: <b>HbA1c</b> in diabetes, <b>eGFR</b> in kidney disease, <b>TSH</b> in thyroid disease.</p><p>The effect of treatment is followed too, such as the <b>INR</b> with blood thinners and the blood count during chemotherapy.</p>" }
  ]},
  { t:"Prevention, heredity and NIPT", cards:[
    { h:"Preventive testing", b:"<p>Spotting risk factors before symptoms appear: cholesterol (cardiovascular disease), HbA1c and glucose (diabetes), eGFR (kidney function), Lp(a), ferritin and the blood count.</p>" },
    { h:"Hereditary conditions", b:"<p>For example sickle cell disease, thalassaemia, haemophilia, cystic fibrosis, Huntington’s disease and hereditary risk of breast and ovarian cancer (BRCA1/BRCA2).</p><p class='note'>An ordinary blood count is not the same as DNA testing: that needs a specific request.</p>" },
    { h:"Fertility and NIPT", b:"<p>Hormones such as FSH, LH, oestradiol, progesterone, AMH, prolactin, testosterone and TSH help in fertility testing.</p><p>The <b>NIPT</b> is available in the Netherlands from <b>10 weeks</b> of pregnancy and screens for trisomy 21, 18 and 13. It is a screening, not a definitive diagnosis.</p>" },
    { h:"The request", b:"<p>A request comes from a doctor, nurse or other <b>authorised care provider</b>, such as a midwife: digitally or on a paper lab form.</p>" }
  ]}],
  quiz:[
    { q:"Which test belongs to monitoring diabetes?", a:["TSH","HbA1c","Troponin"], c:1, e:"HbA1c and glucose are used in diabetes." },
    { q:"Which value do you follow with blood thinners such as acenocoumarol?", a:["INR","CRP","Ferritin"], c:0, e:"The INR is used with certain anticoagulants." },
    { q:"From how many weeks of pregnancy is the NIPT available in the Netherlands?", a:["6 weeks","10 weeks","20 weeks"], c:1, e:"The NIPT is available from 10 weeks of pregnancy." },
    { q:"What is the NIPT?", a:["A definitive diagnosis","A screening test","An amniocentesis"], c:1, e:"The NIPT is a screening test; an abnormal result is followed by further testing." },
    { q:"Which test points to heart damage?", a:["Troponin","eGFR","LDL"], c:0, e:"Troponin is tested for heart damage, such as a heart attack." },
    { q:"Who may request a blood test?", a:["Any patient themselves","An authorised care provider","Only the laboratory"], c:1, e:"A doctor, nurse or other authorised care provider, e.g. a midwife." }
  ]},
{ id:"m3", t:"Types of blood tests", s:"Tubes, methods and results", lessons:[
  { t:"Tests and the right tube", cards:[
    { h:"Tube colours", b:"<ul class='tubes'><li><i style='background:#3F8E5B'></i><b>Green / yellow</b> clinical chemistry: kidney, liver. <b>Grey</b> (NaF): glucose</li><li><i style='background:#7A55A8'></i><b>Purple (EDTA)</b> haematology: blood count, and DNA testing</li><li><i style='background:#7DB7E2'></i><b>Light blue (citrate)</b> coagulation: INR, APTT, PT</li><li><i style='background:#E79CBC'></i><b>Pink or purple</b> blood group and transfusion</li><li><i style='background:#E2B43A'></i><b>Yellow (serum)</b> immunology: ANA, IgE, antibodies</li></ul>" },
    { h:"Venous or capillary", b:"<p><b>Venous:</b> from a vein, usually in the crook of the elbow, with a needle and collection system. Larger volume, several tubes.</p><p><b>Capillary:</b> a small prick with a lancet in the fingertip, in newborns the side of the heel, sometimes the earlobe. For small volumes.</p>", img:"capillair.jpg" },
    { h:"What can be done capillary?", b:"<p><b>Yes:</b> glucose, Hb, CRP, HbA1c, cholesterol, triglycerides, INR point-of-care test.</p><p><b>Not as standard:</b> blood cultures, APTT, PT/INR (lab), ESR, crossmatch, extensive hormone testing.</p>" }
  ]},
  { t:"Blood gas, cultures and results", cards:[
    { h:"Arterial blood gas (ABG)", b:"<p>Blood from an <b>artery</b>, usually the radial artery at the wrist. Measures pO₂, pCO₂, pH and bicarbonate. Results within minutes. Only by a doctor or an authorised, competent specialised care provider.</p>" },
    { h:"Blood cultures", b:"<p>When sepsis is suspected: venous blood in an <b>aerobic and an anaerobic</b> bottle. A first positive alert can come within 24–48 hours; a final negative usually takes about <b>5 days</b>.</p>" },
    { h:"Reliable results", b:"<p>Keep the blood as ‘clean’ as possible. Work with <b>closed systems</b> wherever you can, so the chance of contamination from the surroundings is as small as possible.</p>" }
  ]}],
  quiz:[
    { q:"Which cap colour is used for coagulation tests (INR, APTT)?", a:["Purple","Light blue","Yellow"], c:1, e:"Light blue: sodium citrate, for coagulation tests." },
    { q:"Which tube do you use for a blood count?", a:["Purple (EDTA)","Grey (NaF)","Green"], c:0, e:"Haematology goes in the purple EDTA tube." },
    { q:"Where do you take a capillary sample in a newborn?", a:["Fingertip","Earlobe","Side of the heel"], c:2, e:"In newborns, the side of the heel." },
    { q:"Which test can NOT be done capillary as standard?", a:["Glucose","Blood culture","CRP"], c:1, e:"Blood cultures are not taken capillary." },
    { q:"Where is an arterial blood gas usually taken?", a:["Crook of the elbow","Radial artery (wrist)","Fingertip"], c:1, e:"Usually the radial artery." },
    { q:"How long does a final negative blood culture usually take?", a:["24 hours","2 days","About 5 days"], c:2, e:"Usually about 5 days, depending on the protocol." },
    { q:"A grey cap (sodium fluoride) is mainly used for…", a:["Glucose","Blood group","DNA"], c:0, e:"NaF stops the breakdown of glucose." }
  ]},
{ id:"m4", t:"Venepuncture", s:"Authorisation and indication", lessons:[
  { t:"Are you allowed to draw?", cards:[
    { h:"A reserved procedure", b:"<p>Venepuncture is a <b>reserved procedure</b> under the Dutch BIG Act. You must be <b>authorised and demonstrably competent</b>.</p><p>Not independently authorised? Then you need an instruction from an independently authorised care provider.</p>", img:"venapunctie.jpg" },
    { h:"What you need to know", b:"<ul><li>The correct technique</li><li>The hygiene rules</li><li>How to act if complications occur</li><li>Any extra requirements and protocols of your organisation</li></ul>" },
    { h:"Drawing with care", b:"<ul><li>Always check the request and the identity</li><li>Take only the amount of blood needed</li><li>Use smaller tubes for children and vulnerable patients where possible</li><li>Avoid unnecessary repeat draws (risk of anaemia)</li><li>Check whether an add-on test on an earlier sample is possible</li></ul>" }
  ]}],
  quiz:[
    { q:"Under the Dutch BIG Act, venepuncture is a…", a:["free procedure","reserved procedure","procedure for doctors only"], c:1, e:"It is a reserved procedure." },
    { q:"What do you need if you are not independently authorised?", a:["An instruction from an independently authorised care provider","Permission from the laboratory","Nothing extra"], c:0, e:"An instruction from an independently authorised care provider." },
    { q:"Why do you avoid unnecessary repeat blood draws?", a:["Because of the risk of anaemia","Because tubes are expensive","Because the result changes"], c:0, e:"Repeated draws increase the risk of anaemia." },
    { q:"What do you always check before a venepuncture?", a:["Only the tubes","The request and the identity","The blood group"], c:1, e:"Always check the request and the patient’s identity." }
  ]},
{ id:"m5", t:"Materials", s:"Systems, tubes and supplies", lessons:[
  { t:"Open and closed", cards:[
    { h:"Open system", b:"<p>Blood is drawn with a <b>syringe and needle</b> and then transferred to the tubes. Risks: blood exposure, contamination, needlestick injury, haemolysis and clots.</p><p class='note'>Injecting blood into a tube with a needle is not recommended: use a closed transfer device.</p>" },
    { h:"Closed system", b:"<p>The vacuum or Vacutainer system. Blood flows <b>directly</b> from the vein into the vacuum tube, without contact with the outside air. Preferred for routine blood collection (also by the WHO).</p><p>Parts: <b>double-ended needle</b>, <b>needle holder</b> and <b>vacuum tube</b>.</p>", img:"vacutainer.jpg" },
    { h:"Straight needle or butterfly", b:"<p>The <b>straight needle</b> with holder suits most routine draws. The <b>butterfly</b> (winged needle with tubing) is useful for small or hard-to-reach veins.</p>", img:"butterfly.jpg" }
  ]},
  { t:"Tubes and supplies", cards:[
    { h:"Additives", b:"<dl><dt>Anticoagulants</dt><dd>EDTA, citrate, heparin</dd><dt>Clot activators</dt><dd>To obtain serum</dd><dt>Glycolysis inhibitors</dt><dd>Stop the breakdown of glucose</dd></dl>" },
    { h:"Order of draw", b:"<p>Keep to the <i>order of draw</i>, so additives don’t carry over into the next tube and affect the result.</p>", img:"volgorde.jpg" },
    { h:"With a closed system", b:"<ul><li>Check the expiry date and the right tube</li><li>Fill tubes sufficiently, especially citrate tubes</li><li>Invert gently as the manufacturer says, don’t shake</li><li>Safety needle straight into the sharps container</li></ul>" },
    { h:"Supplies", b:"<p>Closed collection system, tubes/culture bottles and labels, chlorhexidine-alcohol 70%, gauze, tourniquet, hypoallergenic plaster, underpad, sharps container, waste bin and materials for a pressure bandage.</p>", img:"benodigdheden.jpg" }
  ]}],
  quiz:[
    { q:"What is the key feature of a closed system?", a:["Blood goes into a syringe first","Blood flows directly into the vacuum tube","No needle is needed"], c:1, e:"In a closed system the blood flows directly into the vacuum tube." },
    { q:"Which risk belongs to the open system?", a:["Haemolysis from too much pressure","Too much vacuum","No risk at all"], c:0, e:"Too much pressure can damage red blood cells (haemolysis)." },
    { q:"When is a butterfly useful?", a:["With large, clearly visible veins","With small or hard-to-reach veins","Only for blood cultures"], c:1, e:"The winged needle helps with small or hard-to-reach veins." },
    { q:"How do you mix a tube with an additive?", a:["Shake hard","Invert gently as the manufacturer says","Don’t mix"], c:1, e:"Invert gently, don’t shake." },
    { q:"Why do you keep to the order of draw?", a:["To prevent carry-over of additives","Because the last tube must always be full","For the paperwork"], c:0, e:"So additives don’t end up in the next tube." },
    { q:"Which tubes especially must be filled properly?", a:["Citrate tubes","Serum tubes","EDTA tubes"], c:0, e:"Citrate tubes for coagulation tests must be filled sufficiently." },
    { q:"Which of these is an anticoagulant?", a:["EDTA","A glycolysis inhibitor","Serum"], c:0, e:"EDTA, citrate and heparin are anticoagulants." }
  ]},
{ id:"m6", t:"Preparation", s:"Ten steps before the puncture", lessons:[
  { t:"The ten steps", cards:[
    { h:"Steps 1–4", b:"<ol><li><b>Calm, safe setting</b>: light, privacy, clean workspace.</li><li><b>Check the request</b>: which tests and tubes?</li><li><b>Identify</b>: let the patient state their own name and date of birth and compare.</li><li><b>Inform</b>: explain, ask consent, ask about fainting.</li></ol>" },
    { h:"Steps 5–7", b:"<ol start='5'><li><b>Comfortable position</b>: seated with the arm supported, or lying down if there is a risk of fainting.</li><li><b>Lay out materials</b>: expiry date, intact packaging, right tubes.</li><li><b>Hand hygiene</b> and disposable gloves.</li></ol>" },
    { h:"Steps 8–10", b:"<ol start='8'><li>Prepare the <b>disinfection materials</b>.</li><li><b>Safety needle</b> in the holder; the cap stays on until you puncture.</li><li>Check <b>labels and tubes</b>; label straight after the draw, with the patient.</li></ol>" }
  ]}],
  quiz:[
    { q:"How do you identify the patient?", a:["You read out the name and ask if it’s right","The patient states their own name and date of birth","You only look at the label"], c:1, e:"Let the patient state their full name and date of birth." },
    { q:"Which position do you choose if there is a higher risk of fainting?", a:["Standing","Seated without support","Lying down"], c:2, e:"Lying down when the risk of fainting is higher." },
    { q:"When do you label the tubes?", a:["Straight after the draw, with the patient","At the end of the day","Before the draw, in the cupboard"], c:0, e:"Straight after the draw, with the patient." },
    { q:"When do you remove the needle cap?", a:["When laying out materials","At the moment of puncture","After disinfecting your hands"], c:1, e:"The cap stays on until you puncture." }
  ]},
{ id:"m7", t:"Site selection", s:"Choosing the right vein", lessons:[
  { t:"Arm, tourniquet and vein", cards:[
    { h:"Arm and tourniquet", b:"<p>Let the arm hang relaxed and slightly down, well supported.</p><div class='stats'><div><b>7–10 cm</b><span>tourniquet above the site</span></div><div><b>≤ 1 min</b><span>tourniquet time</span></div></div>" },
    { h:"Palpate and choose", b:"<p>Feel with your <b>index and middle finger</b>: position, size, elasticity and course.</p><p>The <b>median cubital vein</b> in the crook of the elbow is usually preferred. Avoid bruises, swelling, inflammation and damaged skin.</p>" },
    { h:"Disinfect", b:"<p>Disinfect according to protocol and let it <b>dry completely</b>. Don’t touch the skin again unless aseptically. For blood cultures work extra aseptically and disinfect the bottle caps too.</p><p class='note'>Don’t let the patient repeatedly clench or pump their fist: it affects blood values.</p>" }
  ]}],
  quiz:[
    { q:"How far above the puncture site do you apply the tourniquet?", a:["2–3 cm","7–10 cm","15–20 cm"], c:1, e:"About 7–10 cm above the puncture site." },
    { q:"What is the preferred maximum tourniquet time?", a:["1 minute","3 minutes","5 minutes"], c:0, e:"Preferably no more than 1 minute." },
    { q:"Which vein is usually preferred?", a:["Median cubital vein","Radial artery","A vein in the hand"], c:0, e:"The median cubital vein in the crook of the elbow." },
    { q:"Why should the patient not keep pumping their fist?", a:["It hurts","It can affect blood values","The vein will roll"], c:1, e:"Pumping can affect certain blood values." },
    { q:"What do you do after disinfecting?", a:["Puncture straight away while wet","Let it dry completely","Palpate once more with your finger"], c:1, e:"Let it dry completely and don’t touch the skin again." }
  ]},
{ id:"m8", t:"Performing the draw", s:"Step by step", lessons:[
  { t:"Puncture and fill", cards:[
    { h:"The puncture", b:"<ol><li>Hold the needle between thumb and index finger, <b>bevel up</b>.</li><li>Anchor the vein: pull the skin gently taut about <b>3–5 cm</b> below the site.</li><li>Puncture at an angle of about <b>15–30 degrees</b>.</li></ol>" },
    { h:"Filling the tubes", b:"<ol start='4'><li>Hold the holder steady and insert the tube so the cap is pierced.</li><li>Fill the tubes in the <b>right order</b>; the vacuum does the work.</li><li><b>Release the tourniquet</b> once the blood flows well.</li><li>Mix the tubes by gently inverting.</li></ol>" },
    { h:"Finishing", b:"<ol start='8'><li>First the last tube out, then the needle. <b>Activate the safety mechanism straight away</b> and drop the needle in the sharps container.</li><li>Press with clean gauze <b>without bending the arm</b>; then a plaster.</li></ol>" }
  ]}],
  quiz:[
    { q:"At what angle do you puncture the vein?", a:["5–10 degrees","15–30 degrees","45–60 degrees"], c:1, e:"About 15–30 degrees." },
    { q:"How do you hold the needle?", a:["Bevel up","Bevel down","It doesn’t matter"], c:0, e:"With the bevel facing up." },
    { q:"When do you release the tourniquet?", a:["Only after removing the needle","As soon as the blood flows well","Before puncturing"], c:1, e:"As soon as the blood flow is well established." },
    { q:"What do you remove first when finishing?", a:["The needle","The last tube","Tourniquet and needle together"], c:1, e:"First the last tube, then the needle." },
    { q:"How do you apply pressure to the site?", a:["With the arm bent","Without bending the arm","Not needed, plaster straight away"], c:1, e:"Apply pressure without bending the arm." }
  ]},
{ id:"m9", t:"Points of attention", s:"Puncture sites and safety", lessons:[
  { t:"Where not to puncture", cards:[
    { h:"Avoid or assess first", b:"<ul><li>Arm after mastectomy with axillary lymph node removal (lymphoedema; follow protocol)</li><li>Scars</li><li>Bruises (haematomas)</li><li>Oedema</li><li>Arm with an IV line</li><li>Burns</li><li>Arm with a dialysis shunt</li><li>Inflamed or infected skin</li><li>Arm on the paralysed side</li></ul>" },
    { h:"During and after the draw", b:"<dl><dt>Attempts</dt><dd>No more than 2 per care provider, then an experienced colleague.</dd><dt>Cytostatics</dt><dd>Extra care; follow the safety protocol.</dd><dt>Clotting</dt><dd>On anticoagulants, press longer.</dd><dt>Blood cultures</dt><dd>Take them before the other tubes.</dd><dt>Needle</dt><dd>Never recap.</dd></dl>" }
  ]},
  { t:"Emergencies", cards:[
    { h:"Needlestick injury", b:"<ol><li>Stop and make the situation safe.</li><li>Let the wound bleed freely, <b>don’t squeeze</b>.</li><li>Rinse with running water, wash with soap.</li><li>Disinfect according to protocol.</li><li>Report straight away to your manager and the occupational health doctor.</li></ol><p class='note'>After possible HIV exposure, PEP must start as soon as possible, preferably within a few hours.</p>" },
    { h:"Fainting", b:"<p>Often a vasovagal reaction: blood pressure and sometimes heart rate drop suddenly.</p><ol><li>Stop at once, remove the needle safely.</li><li>Lay the patient flat, legs raised if possible.</li><li>Check consciousness and breathing, call for help.</li><li>Loosen tight clothing, fresh air.</li><li>Let them recover calmly, sit up slowly.</li></ol><p class='note'><b>112</b> in a serious situation. No normal breathing: start CPR and get an AED.</p>" }
  ]}],
  quiz:[
    { q:"What is the maximum number of attempts per care provider?", a:["1","2","4"], c:1, e:"No more than 2, then call an experienced colleague." },
    { q:"What do you NOT do after a needlestick injury?", a:["Let it bleed","Squeeze the wound","Rinse with water"], c:1, e:"Don’t squeeze; let the wound bleed freely." },
    { q:"The patient has an IV line. Which arm do you preferably use?", a:["The arm with the IV","The other arm","It doesn’t matter"], c:1, e:"The other arm; otherwise the sample can be diluted or contaminated." },
    { q:"Which position for someone who faints?", a:["Sitting with the head between the knees","Flat on the back, legs raised if possible","Standing and walking"], c:1, e:"Flat on the back with the legs slightly raised." },
    { q:"May you put the cap back on a used needle?", a:["Yes, always","Never","Only with a butterfly"], c:1, e:"Never recap a needle." },
    { q:"What do you take before the other tubes?", a:["Blood cultures","EDTA tube","Citrate tube"], c:0, e:"Blood cultures are taken before the other tubes." },
    { q:"When must PEP start after possible HIV exposure?", a:["Within a week","As soon as possible, preferably within a few hours","After the lab result"], c:1, e:"As soon as possible, preferably within a few hours." }
  ]},
{ id:"m10", t:"Complications & tips", s:"When it doesn’t go as planned", lessons:[
  { t:"Complications", cards:[
    { h:"No blood, haematoma, no vein", b:"<dl><dt>No blood in the tube</dt><dd>Check the connection, adjust the needle carefully, don’t search for long.</dd><dt>Haematoma</dt><dd>Release the tourniquet, remove the needle, press firmly.</dd><dt>No vein palpable</dt><dd>Lower the arm, warm compress, relax the hand.</dd></dl>" },
    { h:"Rolling, hard, bright red, swelling", b:"<dl><dt>Vein rolls away</dt><dd>Anchor skin and vein well, or choose another vein.</dd><dt>Vein feels hard</dt><dd>Avoid it; find another site.</dd><dt>Pulsating, bright red blood</dt><dd>Possibly an artery: stop, press for a long time, immediate medical assessment.</dd><dt>Swelling while puncturing</dt><dd>Blood outside the vein: stop, release tourniquet, remove needle, press.</dd></dl>" }
  ]},
  { t:"Tips from practice", cards:[
    { h:"The patient", b:"<ul><li>Take your time and work calmly</li><li>Reassure and explain briefly</li><li>Let anxious patients lie down if possible</li><li>Distract with calm breathing</li><li>Agree whether they want to know when you puncture</li></ul>" },
    { h:"The technique", b:"<ul><li>Feel the course of the vein; don’t rush</li><li>A warm compress makes veins easier to feel</li><li>Never force a puncture: ask a colleague in time</li><li>Watch for paleness, sweating and nausea</li><li>Check the site and let them stand up slowly</li></ul>" }
  ]}],
  quiz:[
    { q:"Pulsating, bright red blood is flowing. What is probably happening?", a:["A haematoma","An artery has been punctured","The tube is full"], c:1, e:"An artery may have been punctured: stop and press for a long time." },
    { q:"The vein rolls away. What do you do?", a:["Puncture harder","Anchor skin and vein well","Tighten the tourniquet"], c:1, e:"Anchor the skin and vein well below the site." },
    { q:"What helps if no vein can be felt?", a:["Fist pumping","A warm compress","Tourniquet longer than 3 minutes"], c:1, e:"A warm compress and lowering the arm can help." },
    { q:"Swelling appears while puncturing. What do you do?", a:["Carry on until the tube is full","Stop, release tourniquet, remove needle, press","Pierce a second tube"], c:1, e:"Blood is leaking outside the vein: stop and press well." },
    { q:"The puncture isn’t working. What is right?", a:["Keep trying until it works","Don’t force it; call a colleague in time","Send the patient home"], c:1, e:"Never force a puncture." }
  ]}
];
