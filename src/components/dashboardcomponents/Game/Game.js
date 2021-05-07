import React, { useEffect, Component } from "react";
import "./Game.scss";
//import PoseNet from "react-posenet";
import * as ml5 from "ml5";
import * as p5 from "p5";
import { db } from "../../../firebase";

let video;
let poseNet;
let poses = [];
let width = 1360;
let height = 1020;

let score = 0;
let gameState = 0;
let live = false;
let write = false;

let targetRadius = 100;

let leftShoulder = { x: -Infinity, y: -Infinity };
let rightShoulder = { x: -Infinity, y: -Infinity };
let leftElbow = { x: -Infinity, y: -Infinity };
let rightElbow = { x: -Infinity, y: -Infinity };
let leftWrist = { x: -Infinity, y: -Infinity };
let rightWrist = { x: -Infinity, y: -Infinity };
let leftKnee = { x: -Infinity, y: -Infinity };
let rightKnee = { x: -Infinity, y: -Infinity };
let leftAnkle = { x: -Infinity, y: -Infinity };
let rightAnkle = { x: -Infinity, y: -Infinity };

let LStarget;
let RStarget;
let LEtarget;
let REtarget;
let LWtarget;
let RWtarget;
let LKtarget;
let RKtarget;
let LAtarget;
let RAtarget;
let targets = [];
let set = false;

let done = 0;

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (sketch) => {
    sketch.setup = () => {
      let cnv = sketch.createCanvas(width, height);
      cnv.position(400, 0);
      video = sketch.createCapture(sketch.VIDEO);
      video.size(width, height);
      sketch.initializeTargets();
      let options = {
        architecture: "ResNet50",
        outputStride: 32,
      };
      poseNet = ml5.poseNet(video, options, () => {
        live = true;
      });
      poseNet.on("pose", function (results) {
        poses = results;
      });
      video.hide();
    };

    sketch.draw = () => {
      if (!live) return;
      sketch.clear();
      sketch.image(video, 0, 0, width, height);
      if (gameState == 0) {
        sketch.updateScore();
        sketch.drawKeypoints();
        sketch.drawSkeleton();
        sketch.setTarget();
        sketch.drawTarget();
        sketch.check();
      } else {
        sketch.fill(204, 52, 235);
        sketch.textSize(100);
        sketch.text("Final Score:" + score, 150, 150);
        while (!write) {
          db.collection("accounts").doc("JYiZVFFxW2NpSTS3HNhfmGmvI063").update({
            "score.high": score,
          });
          write = true;
        }
      }
    };

    sketch.updateScore = () => {
      score++;
      sketch.textSize(100);
      sketch.text(score, 20, 100);
    };

    sketch.check = () => {
      if (done == 10) gameState = 1;
      if (
        sketch.dist(LStarget.x, LStarget.y, leftShoulder.x, leftShoulder.y) <
        targetRadius * 0.5
      ) {
        done++;
        LStarget.x = Infinity;
        LStarget.y = Infinity;
        targets[0] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(RStarget.x, RStarget.y, rightShoulder.x, rightShoulder.y) <
        targetRadius * 0.5
      ) {
        done++;
        RStarget.x = Infinity;
        RStarget.y = Infinity;
        targets[1] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(LEtarget.x, LEtarget.y, leftElbow.x, leftElbow.y) <
        targetRadius * 0.5
      ) {
        done++;
        LEtarget.x = Infinity;
        LEtarget.y = Infinity;
        targets[2] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(REtarget.x, REtarget.y, rightElbow.x, rightElbow.y) <
        targetRadius * 0.5
      ) {
        done++;
        REtarget.x = Infinity;
        REtarget.y = Infinity;
        targets[3] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(LWtarget.x, LWtarget.y, leftWrist.x, leftWrist.y) <
        targetRadius * 0.5
      ) {
        done++;
        LWtarget.x = Infinity;
        LWtarget.y = Infinity;
        targets[4] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(RWtarget.x, RWtarget.y, rightWrist.x, rightWrist.y) <
        targetRadius * 0.5
      ) {
        done++;
        RWtarget.x = Infinity;
        RWtarget.y = Infinity;
        targets[5] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(LKtarget.x, LKtarget.y, leftKnee.x, leftKnee.y) <
        targetRadius * 0.5
      ) {
        done++;
        LKtarget.x = Infinity;
        LKtarget.y = Infinity;
        targets[6] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(RKtarget.x, RKtarget.y, rightKnee.x, rightKnee.y) <
        targetRadius * 0.5
      ) {
        done++;
        RKtarget.x = Infinity;
        RKtarget.y = Infinity;
        targets[7] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(LAtarget.x, LAtarget.y, leftAnkle.x, leftAnkle.y) <
        targetRadius * 0.5
      ) {
        done++;
        LAtarget.x = Infinity;
        LAtarget.y = Infinity;
        targets[8] = "";
        sketch.drawTarget();
      }
      if (
        sketch.dist(RAtarget.x, RAtarget.y, rightAnkle.x, rightAnkle.y) <
        targetRadius * 0.5
      ) {
        done++;
        RAtarget.x = Infinity;
        RAtarget.y = Infinity;
        targets[9] = "";
        sketch.drawTarget();
      }
    };

    sketch.drawKeypoints = () => {
      for (let i = 0; i < poses.length; i++) {
        const pose = poses[i].pose;
        for (let j = 5; j < pose.keypoints.length; j++) {
          const keypoint = pose.keypoints[j];
          if (keypoint.score > 0.2) {
            switch (j) {
              case 5:
                leftShoulder = poses[0].pose.keypoints[j].position;
                break;
              case 6:
                rightShoulder = poses[0].pose.keypoints[j].position;
                break;
              case 7:
                leftElbow = poses[0].pose.keypoints[j].position;
                break;
              case 8:
                rightElbow = poses[0].pose.keypoints[j].position;
                break;
              case 9:
                leftWrist = poses[0].pose.keypoints[j].position;
                break;
              case 10:
                rightWrist = poses[0].pose.keypoints[j].position;
                break;
              case 13:
                leftKnee = poses[0].pose.keypoints[j].position;
                break;
              case 14:
                rightKnee = poses[0].pose.keypoints[j].position;
                break;
              case 15:
                leftAnkle = poses[0].pose.keypoints[j].position;
                break;
              case 16:
                rightAnkle = poses[0].pose.keypoints[j].position;
                break;
              default:
                break;
            }
            sketch.fill(187, 255, 0);
            sketch.noStroke();
            sketch.ellipse(keypoint.position.x, keypoint.position.y, 20, 20);
          }
        }
      }
    };

    sketch.setTarget = () => {
      if (!set) {
        for (let i = 0; i < targets.length; i++) {
          targets[i].x = sketch.map(
            Math.random(),
            0,
            1,
            0.1 * width,
            0.95 * width
          );
          targets[i].y = sketch.map(
            Math.random(),
            0,
            1,
            0.05 * height,
            0.95 * height
          );
        }
        set = true;
      }
    };

    sketch.drawTarget = () => {
      for (let i = 0; i < targets.length; i++) {
        sketch.push();
        switch (i) {
          case 0:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(252, 92, 56);
            break;
          case 1:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(255, 220, 105);
            break;
          case 2:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(230, 255, 105);
            break;
          case 3:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(170, 255, 105);
            break;
          case 4:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(105, 255, 152);
            break;
          case 5:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(105, 255, 225);
            break;
          case 6:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(105, 200, 255);
            break;
          case 7:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(105, 127, 255);
            break;
          case 8:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(185, 105, 255);
            sketch.text("LA");
            break;
          case 9:
            if (targets[i] == "") {
              sketch.strokeWeight(0);
              break;
            }
            sketch.strokeWeight(8);
            sketch.stroke(255, 105, 245);
            sketch.text("RA");
            break;
          default:
            break;
        }
        sketch.noFill();
        sketch.translate(targets[i].x, targets[i].y);
        const radius = targetRadius * (1 + 0.08 * Math.sin(2 * 0.2));
        sketch.ellipse(0, 0, radius, radius);
        sketch.pop();
      }
    };

    sketch.drawSkeleton = () => {
      for (let i = 0; i < poses.length; i++) {
        const skeleton = poses[i].skeleton;
        for (let j = 0; j < skeleton.length; j++) {
          const partA = skeleton[j][0];
          const partB = skeleton[j][1];
          sketch.stroke(187, 255, 0);
          sketch.strokeWeight(10);
          sketch.line(
            partA.position.x,
            partA.position.y,
            partB.position.x,
            partB.position.y
          );
        }
      }
    };

    sketch.initializeTargets = () => {
      LStarget = { x: 0, y: 0 };
      targets.push(LStarget);
      RStarget = { x: 0, y: 0 };
      targets.push(RStarget);
      LEtarget = { x: 0, y: 0 };
      targets.push(LEtarget);
      REtarget = { x: 0, y: 0 };
      targets.push(REtarget);
      LWtarget = { x: 0, y: 0 };
      targets.push(LWtarget);
      RWtarget = { x: 0, y: 0 };
      targets.push(RWtarget);
      LKtarget = { x: 0, y: 0 };
      targets.push(LKtarget);
      RKtarget = { x: 0, y: 0 };
      targets.push(RKtarget);
      LAtarget = { x: 0, y: 0 };
      targets.push(LAtarget);
      RAtarget = { x: 0, y: 0 };
      targets.push(RAtarget);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return (
      <div>
        <div ref={this.myRef}></div>
      </div>
    );
  }
}
