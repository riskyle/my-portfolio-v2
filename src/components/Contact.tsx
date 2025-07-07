
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import supabase from "@/utils/supabase";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });
  const [emailData, setEmailData] = useState({
    from_name: name.firstname + " " + name.lastname,
    from_email: "",
    to_email: "cautor3@gmail.com",
    message: "",
    subject: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "cautor3@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Mobile Number",
      info: "+63 915 858 5694",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Location",
      info: "Buenavista, Agusan del Norte, Philippines",
      color: "from-purple-500 to-pink-500"
    },
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData, EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log('SUCCESS!', result.text);
        toast.success("Email sent successfully!");
      })
      .catch((error) => {
        console.log('FAILED...', error);
      })
      .finally(() => {
      });
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Let's create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I'm always interested in new opportunities and exciting projects.
                Whether you're a company looking to hire, or you're a fellow developer
                wanting to collaborate, don't hesitate to reach out.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${contact.color} rounded-lg flex items-center justify-center`}>
                    <contact.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{contact.title}</h4>
                    <p className="text-gray-600">{contact.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input placeholder="Christian Kyle" onChange={(e) => setName({ ...name, firstname: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Autor" onChange={(e) => setName({ ...name, lastname: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="cautor3@gmail.com" onChange={(e) => setEmailData({ ...emailData, from_email: e.target.value })} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input placeholder="Let's work together!" onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project or just say hi!"
                    rows={5}
                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-200 hover:scale-[1.02]"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
