import React, { useState, useEffect } from 'react';
import stubs from "./stubs";
import moment from "moment";
import api from "../../services/api";

const OnlineCompiler = (props) => {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [jobId, setJobId] = useState(null);
    const [status, setStatus] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        setCode(stubs[language]);
    }, [language]);

    let pollInterval;

    const handleSubmit = async () => {
        const payload = {
            language,
            code,
        };
        try {
            setOutput("");
            setStatus(null);
            setJobId(null);
            setJobDetails(null);
            const { data } = await api.post("/run", payload);
            if (data.jobId) {
                setJobId(data.jobId);
                setStatus("Submitted.");

                // poll here
                pollInterval = setInterval(async () => {
                    const { data: statusRes } = await api.get(
                        `/status`,
                        {
                            params: {
                                id: data.jobId,
                            },
                        }
                    );
                    const { success, job, error } = statusRes;
                    console.log(statusRes);
                    if (success) {
                        const { status: jobStatus, output: jobOutput } = job;
                        setStatus(jobStatus);
                        setJobDetails(job);
                        if (jobStatus === "pending") return;
                        setOutput(jobOutput);
                        clearInterval(pollInterval);
                    } else {
                        console.error(error);
                        setOutput(error);
                        setStatus("Bad request");
                        clearInterval(pollInterval);
                    }
                }, 1000);
            } else {
                setOutput("Retry again.");
            }
        } catch ({ response }) {
            if (response) {
                const errMsg = response.data.err.stderr;
                setOutput(errMsg);
            } else {
                setOutput("Please retry submitting.");
            }
        }
    };

    const renderTimeDetails = () => {
        if (!jobDetails) {
            return "";
        }
        let { submittedAt, startedAt, completedAt } = jobDetails;
        let result = "";
        submittedAt = moment(submittedAt).toString();
        if (!startedAt || !completedAt) return result;
        const start = moment(startedAt);
        const end = moment(completedAt);
        const diff = end.diff(start, "seconds", true);
        result += `Execution Time: ${diff}s`;
        return result;
    };

    return (
        <div className="compiler my-content">
            <h2>Online Code Compiler</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <label>Language:</label>
                        <select
                            value={language}
                            onChange={(e) => {
                                const shouldSwitch = window.confirm(
                                    "Are you sure you want to change language? WARNING: Your current code will be lost."
                                );
                                if (shouldSwitch) {
                                    setLanguage(e.target.value);
                                }
                            }}
                        >
                            <option value="cpp">C++</option>
                            <option value="py">Python</option>
                        </select>
                        <br />
                        <textarea
                            rows="20"
                            cols="60"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        ></textarea>
                        <br />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="col-md-6">
                        <br/>
                        <br/>
                        <p>{status}</p>
                        <p>{renderTimeDetails()}</p>
                        <p>{output}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnlineCompiler;