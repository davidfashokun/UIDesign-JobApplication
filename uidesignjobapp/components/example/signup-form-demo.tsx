"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type Errors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
};

export default function SignupFormDemo() {
  //Handles the work and education entries for the adding and removal and errors
  const [educationEntries, setEducationEntries] = useState([{ id: 1, schoolType: "", schoolName: "", state: "", gradDate: "", degree: "" }]);
  const [workExperienceEntries, setWorkExperienceEntries] = useState([{ id: 1, jobTitle: "", companyName: "", location: "", startDate: "", endDate: "", duties: ""}]);
  const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: ""
  });


//Handles user changes to text boxes
  const handleInputChange = (field: keyof Errors, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    let error = "";
    switch (field) {
      case "firstname":
      case "lastname":
        if (!value.trim()) error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        break;
      case "phoneNumber":
        const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
        if (!phoneRegex.test(value)) error = "Phone number must be 10 digits";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  //Ensures email is in the right format
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const error = !emailRegex.test(value) ? "Invalid email" : "";
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const addEducationEntry = () => {
    setEducationEntries([
    ...educationEntries,
    { id: educationEntries.length + 1, schoolType: "", schoolName: "", state: "", gradDate: "", degree: "" },
  ]);
  };

  const removeEducationEntry = (id: number) => {
    setEducationEntries(educationEntries.filter(entry => entry.id !== id));
  };

  const handleEducationChange = (id: number, field: string, value: string) => {
    setEducationEntries(educationEntries.map(entry =>
    entry.id === id ? { ...entry, [field]: value } : entry
  ));
  };
  const addWorkExperienceEntry = () => {
    setWorkExperienceEntries([...workExperienceEntries, { id: workExperienceEntries.length + 1, jobTitle: "", companyName: "", location: "", startDate: "", endDate: "", duties: ""}]);
  };

  const removeWorkExperienceEntry = (id: number) => {
    setWorkExperienceEntries(workExperienceEntries.filter(entry => entry.id !== id));
  };

  const handleWorkExperienceChange = (id: number, field: string, value: string) => {
    setWorkExperienceEntries(workExperienceEntries.map(entry =>
    entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };
  const hasErrors = () => {
    return Object.values(errors).some((error) => error) || Object.values(formData).some((field) => !field);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasErrors()) {
      console.log("Form submitted", { educationEntries, workExperienceEntries });
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        UNFinished Business Job Application
      </h1>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-2"><strong>Personal Information</strong></h3>
          <hr></hr>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name <span className="text-red-500">*</span></Label>
            <Input id="firstname" placeholder="Tyler" type="text" value={formData.firstname}
            onChange={(e) => handleInputChange("firstname", e.target.value)} 
            onBlur={(e) => handleInputChange("firstname", e.target.value)} />
            {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name <span className="text-red-500">*</span></Label>
            <Input id="lastname" placeholder="Durden" type="text" value={formData.lastname}
            onChange={(e) => handleInputChange("lastname", e.target.value)} 
            onBlur={(e) => handleInputChange("lastname", e.target.value)} />
            {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname}</p>}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onBlur={(e) => validateEmail(e.target.value)} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNumber">Mobile Phone Number <span className="text-red-500">*</span></Label>
          <Input id="phoneNumber" placeholder="(000) 000-0000" type="phoneNumber" value={formData.phoneNumber} 
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          onBlur={(e) => handleInputChange("phoneNumber", e.target.value)} />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
        </LabelInputContainer>

        <div className="mb-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="street">Street</Label>
            <Input id="street" placeholder="123 Paper St" type="text" />
          </LabelInputContainer>
          <div className="flex space-x-2">
            <LabelInputContainer>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Wilmington" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="zip">Zip Code</Label>
              <Input id="zip" placeholder="19801" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mt-4">
            <Label htmlFor="state">State</Label>
            <select id="state" className="border border-gray-300 rounded px-3 py-2">
              <option value="">Select</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </LabelInputContainer>
        </div>

        <div className="mb-8">
          <h3 className="font-medium text-lg mb-2"><strong>Education</strong></h3>
          <hr></hr>
          {educationEntries.map((entry, index) => (
            <div key={entry.id} className="mb-4 border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Education #{index + 1}</h4>

                <button
                  type="button"
                  onClick={() => removeEducationEntry(entry.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
                <br></br>
              <LabelInputContainer className="mb-2">
                <Label htmlFor={`schoolType-${entry.id}`}>Education Type</Label>
                <select
                  id={`schoolType-${entry.id}`}
                  value={entry.schoolType}
                  onChange={(e) => handleEducationChange(entry.id, "schoolType", e.target.value)}
                  className="border border-gray-200 rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="highschool">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="doctorate">Post-Graduate</option>
                </select>
              </LabelInputContainer>
              <LabelInputContainer className="mb-2">
                <Label htmlFor={`schoolName-${entry.id}`}>School Name</Label>
                <Input
                  id={`schoolName-${entry.id}`}
                  placeholder="College of Wilmington"
                  value={entry.schoolName}
                  onChange={(e) => handleEducationChange(entry.id, "schoolName", e.target.value)}
                  type="text"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-2">
                <Label htmlFor={`state-${entry.id}`}>State</Label>
                <Input
                  id={`state-${entry.id}`}
                  placeholder="ex. Florida, FL"
                  value={entry.state}
                  onChange={(e) => handleEducationChange(entry.id, "state", e.target.value)}
                  type="text"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-2">
                <Label htmlFor={`gradDate-${entry.id}`}>Graduation Date</Label>
                <Input
                  id={`gradDate-${entry.id}`}
                  placeholder="MM/YYYY"
                  value={entry.gradDate}
                  onChange={(e) => handleEducationChange(entry.id, "gradDate", e.target.value)}
                  type="date"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor={`degree-${entry.id}`}>Degree Collected</Label>
                <select
                  id={`degree-${entry.id}`}
                  value={entry.degree}
                  onChange={(e) => handleEducationChange(entry.id, "degree", e.target.value)}
                  className="border border-gray-200 rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="highschooldiploma">High School Diploma</option>
                  <option value="bachelors">Bachelors Degree</option>
                  <option value="masters">Masters Degree</option>
                  <option value="doctoral">Doctoral Degree</option>
                </select>
              </LabelInputContainer>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducationEntry}
            className="text-blue-500 text-sm mt-2"
          >
            + Add Education
          </button>
        </div>

        <div className="mb-8">
          <h3 className="font-medium text-lg mb-2"><strong>Work Experience</strong></h3>
          <hr></hr>
          {workExperienceEntries.map((entry, index) => (
            <div key={entry.id} className="mb-4 border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Experience #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeWorkExperienceEntry(entry.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <br></br>
              <LabelInputContainer className="mb-2">
                <Label htmlFor={`jobTitle-${entry.id}`}>Job Title</Label>
                <Input
                  id={`jobTitle-${entry.id}`}
                  placeholder="Software Engineer"
                  value={entry.jobTitle}
                  onChange={(e) => handleWorkExperienceChange(entry.id, "jobTitle", e.target.value)}
                  type="text"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-2">
                <Label htmlFor={`companyName-${entry.id}`}>Company Name</Label>
                <Input
                  id={`companyName-${entry.id}`}
                  placeholder="Company Inc."
                  value={entry.companyName}
                  onChange={(e) => handleWorkExperienceChange(entry.id, "companyName", e.target.value)}
                  type="text"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-2">
                <Label htmlFor={`location-${entry.id}`}>Location</Label>
                <Input
                  id={`location-${entry.id}`}
                  placeholder="ex. New York, NY"
                  value={entry.location}
                  onChange={(e) => handleWorkExperienceChange(entry.id, "location", e.target.value)}
                  type="text"
                />
              </LabelInputContainer>
              <div className="flex space-x-2">
                <LabelInputContainer className="mb-2">
                  <Label htmlFor={`startDate-${entry.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${entry.id}`}
                    placeholder="MM/YYYY"
                    value={entry.startDate}
                    onChange={(e) => handleWorkExperienceChange(entry.id, "startDate", e.target.value)}
                    type="date"
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-2">
                  <Label htmlFor={`endDate-${entry.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${entry.id}`}
                    placeholder="MM/YYYY"
                    value={entry.endDate}
                    onChange={(e) => handleWorkExperienceChange(entry.id, "endDate", e.target.value)}
                    type="date"
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-2">
                  <Label htmlFor={`duties-${entry.id}`}>Duties Performed</Label>
                  <textarea
                    id={`duties-${entry.id}`}
                    placeholder="I was responsible for... "
                    value={entry.duties}
                    onChange={(e) => handleWorkExperienceChange(entry.id, "duties", e.target.value)}
                    className="border border-gray-200 rounded px-3 py-2"
                  />
                </LabelInputContainer>
            </div>
          ))}
          <button
            type="button"
            onClick={addWorkExperienceEntry}
            className="text-blue-500 text-sm mt-2"
          >
            + Add Work Experience
          </button>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-2">
            <strong>Resume/CV</strong><span className="text-red-500">*</span>
          </h3>
          <hr />
          <input
            type="file"
            id="resume"
            name="resume"
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2"
          />
        </div>

        <div className="mb-8">
          <h3 className="font-medium text-lg mb-2"><strong>Additional Documents</strong></h3>
          <hr />
          <input
            type="file"
            id="additionalDocuments"
            name="additionalDocuments"
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2"
          />
        </div>

        <div className="mb-8">
          <h3 className="font-medium text-lg mb-2"><strong>Miscellaneous</strong></h3>
          <hr />
          <input
            type="file"
            id="miscDocuments"
            name="miscDocuments"
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2"
          />
        </div>

        <button disabled={hasErrors()}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        onClick={ApplicationSubmitted}
        >
          Apply &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
const ApplicationSubmitted = () =>{
  return(
  alert("Your application has been submitted")
  );
};

