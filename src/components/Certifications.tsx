import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Certifications = () => {
    const ICON_PATH = import.meta.env.VITE_SUPABASE_BUCKET_URL;

    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const certifications = [
        {
            title: "JavaScript Essentials 1",
            issuer: "Cisco",
            date: "August 2025",
            credentialId: "cf598311-ccb2-4299-a76c-a3e2ebfc137a",
            verificationUrl: "https://www.credly.com/badges/cf598311-ccb2-4299-a76c-a3e2ebfc137a/public_url",
            skills: ["Comments", "Conditional Execution", "Control Flow", "Data Types", "Debugging", "Errors", "Functions", "Loops", "Operators", "Recursions", "Type Casting", "User Interaction", "Variables"],
            shortDescription: "Core JavaScript syntax, variables, operators, flow control, and functions.",
            description: "Cisco, in collaboration with OpenEDG JS Institute, verifies the earner of this badge successfully completed the JavaScript Essentials 1 course and achieved the student level credentials. Earners know the syntax of the core JavaScript; can work with variables, operators, flow control, and functions; know the basics of data types system; think algorithmically and can analyze problems using a programmatic conceptual apparatus; and can design, develop, and improve simple JavaScript programs.",
            logoUrl: `${ICON_PATH}/skills-icon/javascript-logo.png`,
            status: "Active",
            expiryDate: "No Expiry"
        },
        {
            title: "JavaScript Essentials 2",
            issuer: "Cisco",
            date: "August 2025",
            credentialId: "ae39ca51-cc7c-459f-a1fc-4f8746787da8",
            verificationUrl: "https://www.credly.com/badges/ae39ca51-cc7c-459f-a1fc-4f8746787da8/public_url",
            skills: ["Array Techniques", "Comparison Strategies", "Deep Cloning",
                "Enumerating Properties", "Getters", "Inheritance", "Notation Nuances",
                "Object Manipulation", "Object Methods", "Property Management", "Prototypes",
                "Set and Map", "Setters", "Testing Techniques"],
            shortDescription: "Advanced JavaScript programming with object-oriented concepts and data structures.",
            description: "Cisco, in collaboration with OpenEDG JS Institute, verifies the earner of this badge successfully completed the JavaScript Essentials 2 course and achieved the student level credentials. Earner should know coding techniques while introducing both class-based and classless approaches in object-oriented programming, be familiar with a curated range of built-in objects that extend programming capabilities, manage complex data structures, such as Map and Set, and asynchronous programming.",
            logoUrl: `${ICON_PATH}/skills-icon/javascript-logo.png`,
            status: "Active",
            expiryDate: "No Expiry"
        },
    ];

    const toggleExpanded = (index: number) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedCards(newExpanded);
    };

    return (
        <section id="certifications" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {certifications.map((cert, index) => (
                        <Card
                            key={index}
                            className={`group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer flex flex-col h-full ${hoveredCard === index
                                ? 'shadow-2xl shadow-blue-500/25 ring-2 ring-blue-500/20'
                                : 'shadow-lg hover:shadow-xl'
                                }`}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <CardHeader className="relative">
                                <div className="flex items-start justify-between">
                                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                        <img className="w-12 h-12" src={cert.logoUrl} alt="" />
                                    </div>
                                    <Badge
                                        variant={cert.status === 'Active' ? 'default' : 'secondary'}
                                        className={`${cert.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : ''}`}
                                    >
                                        {cert.status}
                                    </Badge>
                                </div>

                                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                                    {cert.title}
                                </CardTitle>

                                <CardDescription className="text-gray-600 font-medium">
                                    {cert.issuer}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="relative flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <div className="mb-4">
                                        <p className="text-gray-700 leading-relaxed">
                                            {expandedCards.has(index) ? cert.description : cert.shortDescription}
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleExpanded(index);
                                            }}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 transition-colors duration-200"
                                        >
                                            {expandedCards.has(index) ? 'Show Less' : 'Read More'}
                                        </button>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 font-medium">Issued:</span>
                                            <span className="text-gray-900 font-semibold">{cert.date}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 font-medium">Expires:</span>
                                            <span className="text-gray-900 font-semibold">{cert.expiryDate}</span>
                                        </div>
                                        {cert.credentialId && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 font-medium">ID:</span>
                                                <span className="text-gray-900 font-mono text-xs bg-gray-100 px-2 py-1 rounded truncate max-w-[150px]" title={cert.credentialId}>
                                                    {cert.credentialId}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Skills</h4>
                                    <div className="flex flex-wrap gap-2 min-h-[3rem]">
                                        {cert.skills.slice(0, expandedCards.has(index) ? cert.skills.length : 6).map((skill, skillIndex) => (
                                            <Badge
                                                key={skillIndex}
                                                variant="outline"
                                                className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                        {!expandedCards.has(index) && cert.skills.length > 6 && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs bg-gray-100 text-gray-600 border-gray-300 cursor-pointer hover:bg-gray-200"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleExpanded(index);
                                                }}
                                            >
                                                +{cert.skills.length - 6} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <a
                                    href={cert.verificationUrl}
                                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>Verify Credential</span>
                                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;