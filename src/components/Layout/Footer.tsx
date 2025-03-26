"use client";
import FooterLogo from "@/assets/images/footer-logo.jpg";
import Twitter from "@/assets/images/Twitter.png";
import Github from "@/assets/images/GitHub.png";

const Footer = () => {
    return (
        <footer className="mx-10">
            <div className="pt-20 pb-10">
                <hr className="border-[#343434] border-2"></hr>
                <div className="mt-10">
                    <div className="flex justify-end">
                        <div className="grid grid-cols-2 w-[500px]">
                            <div>
                                <div className="flex justify-center">
                                    <img
                                        src={FooterLogo}
                                        alt="Image"
                                        className="w-20 h-20 rounded-full"
                                    />
                                </div>
                                <div className="text-center text-[32px] font-semibold mt-4 text-[#ada9a9]">
                                    BUILT BY O625
                                </div>
                            </div>
                            <div className="flex justify-center gap-10">
                                <div>
                                    <a href="https://x.com/ADORORG" target="_blank">
                                        <img
                                            src={Twitter}
                                            alt="Twitter"
                                            className="rounded-lg w-12 h-12 bg-[#696867]"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <a href="https://github.com/ADORORG" target="_blank">
                                        <img
                                            src={Github}
                                            alt="Github"
                                            className="rounded-lg w-12 h-12 bg-[#696867]"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
