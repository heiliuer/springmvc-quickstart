package com.quickstart.controller;

import com.quickstart.config.AppCommonProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafProperties;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class HelloController {

    @Autowired
    AppCommonProperties appCommonProperties;


    @Autowired
    ThymeleafProperties thymeleafProperties;

    @RequestMapping("/")
    String home(Model model, HttpServletRequest request) {
        model.addAttribute("msg", "Hello " + request.getPathInfo());
        return "index";
    }

}